import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssessmentSchema, assessmentResponsesSchema, dimensionScoresSchema } from "@shared/schema";
import { z } from "zod";

function calculateOverallScore(scores: any): number {
  const values = Object.values(scores) as number[];
  const average = values.reduce((sum, score) => sum + score, 0) / values.length;
  return Math.round(average * 20); // Convert to 100-point scale
}

function calculateDimensionScores(responses: any): any {
  const scores: any = {};
  
  // Group questions by dimension - map actual question IDs to dimensions
  const dimensionMappings = [
    { name: 'technologyInfrastructure', patterns: ['tech-', 'technologyInfrastructure'] },
    { name: 'dataQuality', patterns: ['data-', 'dataQuality'] },
    { name: 'teamLiteracy', patterns: ['team-', 'teamLiteracy'] },
    { name: 'systemIntegration', patterns: ['system-', 'integration-', 'systemIntegration'] },
    { name: 'budget', patterns: ['budget-', 'resource-', 'budget', 'budgetResources'] },
    { name: 'dataSecurity', patterns: ['security-', 'privacy-', 'dataSecurity', 'security', 'securityPrivacy'] }
  ];

  dimensionMappings.forEach((dimensionMapping) => {
    let totalScore = 0;
    let questionCount = 0;
    
    // Look through all responses and match by pattern
    Object.keys(responses).forEach(questionId => {
      const matchesPattern = dimensionMapping.patterns.some(pattern => 
        questionId.toLowerCase().includes(pattern.toLowerCase()) || 
        questionId.startsWith(pattern)
      );
      
      if (matchesPattern) {
        totalScore += responses[questionId];
        questionCount++;
      }
    });
    
    // Only include dimension in scores if we have questions for it
    if (questionCount > 0) {
      scores[dimensionMapping.name] = totalScore / questionCount;
    }
  });

  // Add a fallback to ensure we have valid scores
  if (Object.keys(scores).length === 0) {
    console.warn('No dimension scores calculated, using fallback logic');
    // Simple fallback: average all responses and assign to each dimension
    const allResponses = Object.values(responses) as number[];
    const averageScore = allResponses.length > 0 ? 
      allResponses.reduce((sum, score) => sum + score, 0) / allResponses.length : 3;
    
    scores.technologyInfrastructure = averageScore;
    scores.dataQuality = averageScore;
    scores.teamLiteracy = averageScore;
    scores.systemIntegration = averageScore;
    scores.budget = averageScore;
    scores.dataSecurity = averageScore;
  }

  return scores;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Submit assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const requestSchema = z.object({
        organizationName: z.string().min(1).optional(),
        contactEmail: z.string().email().optional(),
        industry: z.string().min(1),
        responses: assessmentResponsesSchema,
      });

      const { organizationName, contactEmail, industry, responses } = requestSchema.parse(req.body);
      
      // Calculate dimension scores
      const scores = calculateDimensionScores(responses);
      
      // Calculate overall score
      const overallScore = calculateOverallScore(scores);

      const assessment = await storage.createAssessment({
        organizationName,
        contactEmail,
        industry,
        responses,
        scores,
        overallScore,
      });

      res.json(assessment);
    } catch (error) {
      console.error("Error creating assessment:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Invalid request data" 
      });
    }
  });

  // Get assessment by ID
  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const assessment = await storage.getAssessment(id);
      
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      res.json(assessment);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all assessments
  app.get("/api/assessments", async (req, res) => {
    try {
      const assessments = await storage.getAllAssessments();
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Email request endpoint - store email requests and send assessment reports via email
  app.post("/api/assessment-email-requests", async (req, res) => {
    try {
      // Check for Brevo API key
      if (!process.env.BREVO_API_KEY) {
        return res.status(503).json({ 
          message: "Email service not configured. Please add BREVO_API_KEY to environment variables." 
        });
      }

      const emailRequestSchema = z.object({
        assessmentId: z.string(),
        email: z.string().email(),
        contactConsent: z.boolean().default(false),
      });

      const { assessmentId, email, contactConsent } = emailRequestSchema.parse(req.body);
      
      // Verify the assessment exists
      const assessment = await storage.getAssessment(assessmentId);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }

      // Store the email request in database
      const emailRequest = await storage.createEmailRequest({
        assessmentId,
        email,
        contactConsent: contactConsent ? 'true' : 'false',
        emailSent: 'false'
      });

      // Generate PDF report
      const { generateAssessmentPDF } = await import('./services/pdf-generator');
      const pdfBuffer = await generateAssessmentPDF(assessment);
      const pdfBase64 = pdfBuffer.toString('base64');

      // Generate email HTML (escape HTML in organizationName)
      const { sendEmail, generateAssessmentEmailHTML } = await import('./services/email');
      const safeOrgName = (assessment.organizationName || 'Your Organization')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      const htmlContent = generateAssessmentEmailHTML(assessment, safeOrgName);

      // Send email with PDF attachment
      await sendEmail({
        to: email,
        subject: `Your AI Readiness Assessment Report - ${assessment.organizationName || 'Results'}`,
        htmlContent,
        pdfBase64,
        pdfFilename: `AI-Readiness-Report-${(assessment.organizationName || 'Report').replace(/[^a-zA-Z0-9]/g, '-')}.pdf`
      });

      // Update email request status
      await storage.updateEmailRequestSentStatus(emailRequest.id, new Date());

      console.log(`Email sent successfully to ${email} for assessment ${assessmentId}, Contact consent: ${contactConsent}`);
      
      // Return success
      res.status(200).json({ message: "Email sent successfully with PDF report" });
    } catch (error) {
      console.error("Error processing email request:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to send email" 
      });
    }
  });



  const httpServer = createServer(app);
  return httpServer;
}

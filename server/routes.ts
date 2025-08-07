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
  
  // Group questions by dimension - support both naming conventions and new structure
  const dimensionMappings = [
    { name: 'technologyInfrastructure', aliases: ['technologyInfrastructure'] },
    { name: 'dataQuality', aliases: ['dataQuality'] },
    { name: 'teamLiteracy', aliases: ['teamLiteracy'] },
    { name: 'systemIntegration', aliases: ['systemIntegration'] },
    { name: 'budget', aliases: ['budget', 'budgetResources'] },
    { name: 'dataSecurity', aliases: ['dataSecurity', 'security'] },
    { name: 'aiGovernance', aliases: ['aiGovernance', 'securityPrivacy'] }
  ];

  dimensionMappings.forEach((dimensionMapping) => {
    let totalScore = 0;
    let questionCount = 0;
    
    // Try all aliases for this dimension
    dimensionMapping.aliases.forEach(alias => {
      for (let i = 1; i <= 5; i++) {
        const questionId = `${alias}_${i}`;
        if (responses[questionId]) {
          totalScore += responses[questionId];
          questionCount++;
        }
      }
    });
    
    // Only include dimension in scores if we have questions for it
    if (questionCount > 0) {
      scores[dimensionMapping.name] = totalScore / questionCount;
    }
  });

  return scores;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Submit assessment
  app.post("/api/assessments", async (req, res) => {
    try {
      const requestSchema = z.object({
        organizationName: z.string().min(1),
        contactEmail: z.string().email(),
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



  const httpServer = createServer(app);
  return httpServer;
}

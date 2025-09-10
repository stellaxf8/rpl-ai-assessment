import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Assessment, DimensionScores } from "@shared/schema";

interface BusinessDevelopmentProps {
  assessment?: Assessment;
}

export default function BusinessDevelopment({ assessment }: BusinessDevelopmentProps) {
  const { toast } = useToast();
  const [isConsultationRequested, setIsConsultationRequested] = useState(false);

  const handleScheduleConsultation = () => {
    // Check if assessment exists - fallback to contact page if not
    if (!assessment) {
      console.error('Assessment data not available, redirecting to contact page');
      window.open('https://www.redpilllabs.com/contact-us', '_blank');
      return;
    }

    // Extract dimension scores for email body with null safety
    const dimensionScores = assessment.scores as DimensionScores || {};
    const getScoreStatus = (score: number) => {
      if (score >= 4.0) return 'Strong';
      if (score >= 2.5) return 'Moderate'; 
      return 'Needs Improvement';
    };

    // Safe score calculation with fallbacks
    const safeScore = (score: number | undefined) => score ? Math.round(score * 20) : 0;
    const safeStatus = (score: number | undefined) => score ? getScoreStatus(score) : 'Not Available';

    // Create email body with assessment results
    const emailSubject = `AI Readiness Consultation Request - ${assessment.organizationName || 'Organization'}`;
    const emailBody = `Hi,

I just completed the AI Readiness Assessment for ${assessment.organizationName || 'our organization'} and would like to schedule a consultation to discuss our results and next steps.

Company: ${assessment.organizationName || 'Not specified'}
Industry: ${assessment.industry || 'Not specified'}
Contact: ${assessment.contactEmail || 'Not specified'}
Overall AI Readiness Score: ${assessment.overallScore || 0}%

Key Assessment Results:
• Technology Infrastructure: ${safeScore(dimensionScores.technologyInfrastructure)}% - ${safeStatus(dimensionScores.technologyInfrastructure)}
• Data Quality & Access: ${safeScore(dimensionScores.dataQuality)}% - ${safeStatus(dimensionScores.dataQuality)}
• Team AI Literacy: ${safeScore(dimensionScores.teamLiteracy)}% - ${safeStatus(dimensionScores.teamLiteracy)}
• System Integration: ${safeScore(dimensionScores.systemIntegration)}% - ${safeStatus(dimensionScores.systemIntegration)}
• Budget & Resources: ${safeScore(dimensionScores.budget)}% - ${safeStatus(dimensionScores.budget)}
• Data Security & Privacy: ${safeScore(dimensionScores.dataSecurity)}% - ${safeStatus(dimensionScores.dataSecurity)}

I'm interested in discussing how AI can help transform our business operations and would appreciate your expertise in developing an implementation strategy.

Please let me know your availability for a consultation.

Best regards,
${assessment.organizationName || 'Organization'} Team`;

    // Create mailto link with encoded subject, body, and cc
    let mailtoLink = `mailto:info@redpilllabs.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Add cc parameter if contact email exists
    if (assessment.contactEmail) {
      mailtoLink += `&cc=${encodeURIComponent(assessment.contactEmail)}`;
    }
    
    // Use location.href for better cross-browser compatibility
    window.location.href = mailtoLink;
  };



  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-base sm:text-xl font-semibold text-slate-900 mb-6 text-center">Ready to accelerate your AI transformation?</h3>

        {/* Consultation Scheduling */}
        <div className="flex justify-center">
          <Button 
            variant="default" 
            size="lg"
            className="h-auto p-6 hover-lift button-press"
            onClick={handleScheduleConsultation}
          >
            <div className="flex items-center">
              <MessageSquare className="mr-3 h-6 w-6" />
              <div className="font-semibold text-lg">Schedule a Consultation</div>
            </div>
          </Button>
        </div>


      </CardContent>
    </Card>
  );
}
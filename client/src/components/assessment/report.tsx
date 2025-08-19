import { useEffect, useState } from "react";
import { Download, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Assessment } from "@shared/schema";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportProps {
  assessment: Assessment;
  onBack?: () => void;
}

const dimensionConfig = {
  technologyInfrastructure: {
    label: "Technology Infrastructure",
    icon: "🖥️",
    recommendations: {
      high: "Consider upgrading to AI-optimized compute instances for better performance.",
      medium: "Evaluate current infrastructure capabilities and plan for AI-specific resources.",
      low: "Significant infrastructure investment needed before AI implementation."
    }
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "🗄️",
    recommendations: {
      high: "Leverage existing data governance to accelerate AI projects.",
      medium: "Implement data quality framework and establish clear access protocols.",
      low: "Priority focus on data governance and quality standards required."
    }
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "👥",
    recommendations: {
      high: "Leverage this strong foundation to drive AI initiatives across the organization.",
      medium: "Invest in targeted AI training programs for key team members.",
      low: "Comprehensive AI education and training program needed."
    }
  },
  systemIntegration: {
    label: "System Integration",
    icon: "🧩",
    recommendations: {
      high: "Ready for complex AI integrations with existing systems.",
      medium: "Review integration capabilities and plan for AI system compatibility.",
      low: "System integration strategy and API development required."
    }
  },
  budget: {
    label: "Budget & Resources",
    icon: "💰",
    recommendations: {
      high: "Well-positioned to fund comprehensive AI initiatives.",
      medium: "Allocate additional resources for AI infrastructure and training.",
      low: "Develop comprehensive budget plan for AI implementation."
    }
  },
  dataSecurity: {
    label: "Data Security & Privacy",
    icon: "🔒",
    recommendations: {
      high: "Strong data security framework ready for AI data protection needs.",
      medium: "Enhance data protection protocols for AI-specific requirements.",
      low: "Implement comprehensive data security framework before AI deployment."
    }
  },
};

// Helper function to get dynamic color based on score
const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'; // High (Green): 4.0+/5
  if (score >= 50) return 'text-yellow-600'; // Medium (Yellow): 2.5-3.9/5
  return 'text-red-600'; // Low (Red): 0.0-2.4/5
};

export default function Report({ assessment, onBack }: ReportProps) {
  const { organizationName, overallScore, scores, createdAt } = assessment;
  const [isConsultationRequested, setIsConsultationRequested] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Also scroll after a brief delay to ensure all content is rendered
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadPDF = async () => {
    try {
      // Generating PDF

      const reportElement = document.querySelector('[data-report-content]') as HTMLElement;
      if (!reportElement) return;

      // Create canvas from the report element
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Download the PDF
      pdf.save(`AI-Readiness-Report-${organizationName.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`);
      
      // PDF downloaded successfully
    } catch (error) {
      console.error('PDF generation error:', error);
      console.error('PDF generation failed: There was an error generating the PDF. Please try again.');
    }
  };



  const handleScheduleConsultation = () => {
    window.open('https://www.redpilllabs.com/contact-us', '_blank');
  };

  const getScoreLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 4.0) return 'high';
    if (score >= 2.5) return 'medium';
    return 'low';
  };

  const getReadinessDescription = (score: number) => {
    if (score >= 80) return "Excellent AI readiness with strong capabilities across all dimensions.";
    if (score >= 65) return "Good AI readiness with strong potential for successful implementation.";
    if (score >= 50) return "Fair AI readiness with foundation in place but improvement needed.";
    return "Limited AI readiness requiring significant preparation before implementation.";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };





  return (
    <section>
      <Card className="overflow-hidden" data-report-content>
        {/* Report Header */}
        <div className="p-8 text-white" style={{ backgroundColor: '#cd0000' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">AI Readiness Assessment Report</h2>
              <p className="text-blue-100">Comprehensive analysis and recommendations</p>
              <p className="text-blue-100 mt-1">Organization: {organizationName}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{formatDate(createdAt)}</div>
              <div className="text-blue-100">Assessment Date</div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <CardContent className="p-8">
          {/* Executive Summary */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Executive Summary</h3>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${getScoreColor(overallScore)}`}>{overallScore}/100</div>
                  <div className="text-sm text-slate-600">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-success mb-1">
                    {overallScore >= 80 ? "Excellent" : overallScore >= 65 ? "Good" : overallScore >= 50 ? "Fair" : "Poor"}
                  </div>
                  <div className="text-sm text-slate-600">Readiness Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-warning mb-1">
                    {Object.values(scores as any).filter((score: any) => score < 3.5).length}
                  </div>
                  <div className="text-sm text-slate-600">Areas to Improve</div>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {getReadinessDescription(overallScore)} Focus on the lower-scoring dimensions to maximize AI implementation success.
              </p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Detailed Dimension Analysis</h3>
            <div className="space-y-6">
              {Object.entries(scores as any).map(([dimension, score]) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const level = getScoreLevel(scoreValue);
                const percentage = (scoreValue / 5) * 100;

                return (
                  <div key={dimension} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span>{config.icon}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900">{config.label}</h4>
                      </div>
                      <div className="flex items-center">
                        <div className="w-20 mr-3">
                          <Progress 
                            value={percentage} 
                            className="h-3 bg-slate-200" 
                            dynamicColor={true}
                          />
                        </div>
                        <span className="font-bold text-slate-900">{scoreValue.toFixed(1)}/5</span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-3">
                      {level === 'high' 
                        ? "Strong performance in this area with good foundation for AI implementation."
                        : level === 'medium'
                        ? "Moderate performance with room for improvement before AI implementation."
                        : "Significant improvement needed in this area before AI implementation."
                      }
                    </p>
                    <div className={`p-3 rounded border-l-4 ${
                      level === 'high' ? 'border-green-500 bg-green-50' :
                      level === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-red-500 bg-red-50'
                    }`}>
                      <div className="font-medium text-slate-900">Recommendation:</div>
                      <div className="text-slate-700">{config.recommendations[level]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>



          {/* Contact Information */}
          <div className="border-t border-slate-200 pt-6">
            <div className="text-center">
              <p className="text-slate-600 mb-4">Need help implementing these recommendations?</p>
              <Button 
                onClick={handleScheduleConsultation}
                className="hover-lift button-press"
              >
                Schedule a Consultation
                <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Actions */}
      <div className="mt-8 text-center">
        <div className="space-y-4">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-slate-900 hover:bg-slate-800 hover-lift button-press"
            onClick={handleDownloadPDF}
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
          
          {onBack && (
            <div>
              <Button 
                variant="outline" 
                onClick={onBack}
                className="hover-lift button-press"
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Download, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Assessment, DimensionScores } from "@shared/schema";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import BusinessDevelopment from "@/components/enhanced/business-development";
import RadarChart from "@/components/charts/radar-chart";

interface ReportProps {
  assessment: Assessment;
  onBack?: () => void;
}

const dimensionConfig = {
  technologyInfrastructure: {
    label: "Technology Infrastructure",
    icon: "🖥️",
    recommendations: {
      high: "Your infrastructure is AI-ready! Consider GPU-optimized instances (NVIDIA A100/H100), implement auto-scaling for ML workloads, and explore edge computing solutions like AWS Inferentia or Google TPUs for production models. Set up MLOps pipelines with Kubernetes for model deployment.",
      medium: "Upgrade to cloud instances with GPU support (AWS P4, Azure NC series, or Google Cloud A2). Implement container orchestration with Docker/Kubernetes, set up dedicated ML development environments, and ensure 10+ GB RAM per ML engineer. Consider hybrid cloud for sensitive data processing.",
      low: "Start with cloud migration (AWS SageMaker, Azure ML, or Google AI Platform). Invest in high-performance computing infrastructure, reliable internet connectivity (1GB+ bandwidth), and backup systems. Budget $50K-200K for initial hardware/cloud resources depending on company size."
    }
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "🗄️",
    recommendations: {
      high: "Excellent data foundation! Implement real-time data pipelines with Apache Kafka or AWS Kinesis, automate data quality monitoring with Great Expectations or Apache Griffin, and create feature stores using Feast or AWS SageMaker Feature Store for ML model consistency.",
      medium: "Establish data cataloging with Apache Atlas or AWS Glue, implement ETL pipelines using Apache Airflow or Azure Data Factory, set up data quality rules (completeness >95%, accuracy >98%), and create centralized data warehouses using Snowflake, BigQuery, or Databricks.",
      low: "Start with data audit and cleanup - identify all data sources, standardize formats, and remove duplicates. Implement basic ETL tools (Talend, Pentaho, or cloud-native solutions), establish data governance policies, and create master data management systems. Target 80%+ data quality before AI implementation."
    }
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "👥",
    recommendations: {
      high: "Your team has strong AI knowledge! Focus on advanced specializations: MLOps certification (Coursera/Udacity), hands-on workshops with TensorFlow/PyTorch, and cross-functional AI project teams. Consider hiring AI specialists for computer vision, NLP, or robotics based on your industry needs.",
      medium: "Invest in structured AI training: enroll 5-10 key staff in programs like Stanford AI Certificate, Google AI courses, or Microsoft AI-900 certification. Create internal 'lunch & learn' sessions, subscribe to AI platforms like Pluralsight or DataCamp, and partner with local universities for ongoing education.",
      low: "Start with AI fundamentals training for all staff. Use free resources like Coursera's AI for Everyone, edX MIT Introduction to Machine Learning, and YouTube channels like 3Blue1Brown. Budget $5K-15K for team training, create AI literacy assessment tests, and establish mentorship programs with AI consultants."
    }
  },
  systemIntegration: {
    label: "System Integration",
    icon: "🧩",
    recommendations: {
      high: "Excellent integration capability! Implement AI microservices with REST/GraphQL APIs, use message brokers like RabbitMQ for real-time AI processing, integrate with existing CRM/ERP through webhooks, and deploy containerized ML models with auto-scaling based on demand.",
      medium: "Develop API-first integration strategy using tools like MuleSoft, Zapier, or Microsoft Logic Apps. Create middleware layers for legacy system connectivity, implement database connectors for real-time data flow, and establish monitoring with tools like New Relic or Datadog for system health.",
      low: "Start by mapping all existing systems and data flows. Implement basic API development (REST endpoints), upgrade legacy systems for API compatibility, invest in integration platforms like Dell Boomi or IBM Integration Bus, and create system documentation for future AI integrations."
    }
  },
  budget: {
    label: "Budget & Resources",
    icon: "💰",
    recommendations: {
      high: "Strong financial position for AI transformation! Allocate 15-20% of IT budget to AI initiatives, invest in premium cloud AI services (AWS SageMaker, Azure Cognitive Services), hire specialized AI talent ($120K-200K salaries), and establish dedicated innovation labs with $500K+ annual budgets.",
      medium: "Plan phased AI investment: start with $100K-300K for initial pilot projects, cloud infrastructure costs ($5K-15K monthly), staff training programs ($20K-50K), and consultant partnerships. Consider leasing GPU hardware to reduce upfront costs and explore government AI grants or tax incentives.",
      low: "Create realistic AI budget starting with $25K-75K for proof-of-concept projects. Focus on cloud-based AI services to minimize infrastructure costs, leverage free/open-source tools (TensorFlow, PyTorch), and consider partnerships with universities for reduced consulting fees. Prioritize high-ROI use cases first."
    }
  },
  dataSecurity: {
    label: "Data Security & Privacy",
    icon: "🔒",
    recommendations: {
      high: "Excellent security posture! Implement AI-specific controls: differential privacy for training data, federated learning for sensitive datasets, homomorphic encryption for cloud AI processing, and AI model security scanning with tools like Adversarial Robustness Toolbox or Microsoft Counterfit.",
      medium: "Strengthen AI security: implement data anonymization tools (ARX, Amnesia), set up secure ML pipelines with encrypted data storage, deploy AI governance frameworks, obtain SOC 2 compliance, and establish model versioning with audit trails using MLflow or DVC (Data Version Control).",
      low: "Critical: Establish basic security foundation before AI implementation. Deploy encryption at rest/transit, implement role-based access controls (RBAC), conduct security assessments, achieve basic compliance (GDPR, CCPA), and invest in security tools like CrowdStrike, Okta for identity management, and data loss prevention (DLP) solutions."
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

          {/* Visual Score Analysis */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Visual Score Analysis</h3>
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-md">
                <RadarChart scores={scores as DimensionScores} />
              </div>
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

          {/* Business Development */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Implementation Planning</h3>
            <div className="space-y-6">
              <BusinessDevelopment assessment={assessment} />
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

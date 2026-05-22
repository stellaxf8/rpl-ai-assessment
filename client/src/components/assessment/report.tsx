import { useEffect, useState } from "react";
import { Download, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Assessment, DimensionScores } from "@/lib/types";
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
      high: {
        text: "Your technology setup is ready for advanced AI tools. Consider cloud-based solutions for automation and analytics.",
        examples: "Automated customer service systems, predictive analytics dashboards"
      },
      medium: {
        text: "Upgrade to cloud computing services and ensure reliable internet connectivity.",
        examples: "Online data storage systems, automated reporting tools"
      },
      low: {
        text: "Focus on basic technology improvements first.",
        examples: "Upgrade computers and internet speed, move data storage to secure cloud platforms"
      }
    }
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "🗄️",
    recommendations: {
      high: {
        text: "Your data is well-organized and accessible. Ready for advanced AI applications.",
        examples: "Trend analysis, customer behavior insights"
      },
      medium: {
        text: "Organize your data better with centralized storage systems.",
        examples: "Create shared databases, implement automated data backups"
      },
      low: {
        text: "Start by cleaning up and organizing your data.",
        examples: "Remove duplicate customer records, create standardized filing systems"
      }
    }
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "👥",
    recommendations: {
      high: {
        text: "Your team has great AI knowledge. Focus on specialized applications for your industry.",
        examples: "Advanced automation systems, custom AI solutions"
      },
      medium: {
        text: "Provide AI training for key staff members.",
        examples: "Online courses for managers, workshops on AI business applications"
      },
      low: {
        text: "Start with basic AI education for your team.",
        examples: "'AI basics for business' courses, lunch-and-learn sessions about AI benefits"
      }
    }
  },
  systemIntegration: {
    label: "System Integration",
    icon: "🧩",
    recommendations: {
      high: {
        text: "Your systems work well together and can easily add AI features.",
        examples: "Automated workflows, smart data analysis across departments"
      },
      medium: {
        text: "Improve how your business systems connect to each other.",
        examples: "Link customer management with inventory systems, integrate sales and marketing platforms"
      },
      low: {
        text: "Focus on making your business systems work together better.",
        examples: "Ensure sales and accounting software can share information, connect different databases"
      }
    }
  },
  budget: {
    label: "Budget & Resources",
    icon: "💰",
    recommendations: {
      high: {
        text: "You have good resources for AI projects. Consider comprehensive solutions.",
        examples: "Automated customer service platforms, business intelligence systems"
      },
      medium: {
        text: "Plan to allocate more resources for AI initiatives.",
        examples: "Budget for staff training, cloud-based AI tools subscription"
      },
      low: {
        text: "Start with smaller AI investments to prove value first.",
        examples: "Simple automation tools, basic data analysis software"
      }
    }
  },
  dataSecurity: {
    label: "Data Security & Privacy",
    icon: "🔒",
    recommendations: {
      high: {
        text: "Your security measures are strong and ready for AI applications.",
        examples: "Secure AI analytics tools, protected customer data processing"
      },
      medium: {
        text: "Strengthen your data security practices before AI implementation.",
        examples: "Improve password policies, encrypt sensitive customer information"
      },
      low: {
        text: "Focus on basic security improvements first.",
        examples: "Implement strong user access controls, ensure regular security updates"
      }
    }
  },
};

const getDimensionRecommendations = (industry: string) => {
  const dataHeavy = ['Healthcare', 'Finance', 'Government'];
  const customerFacing = ['Retail & B2C Sales', 'Media', 'B2B Sales & Distribution'];
  const operationsHeavy = ['Manufacturing', 'Construction', 'Transportation', 'Energy', 'Agriculture'];
  const cluster = dataHeavy.includes(industry) ? 'dataHeavy' :
    customerFacing.includes(industry) ? 'customerFacing' :
    operationsHeavy.includes(industry) ? 'operationsHeavy' : 'knowledge';

  const all = {
    dataHeavy: {
      technologyInfrastructure: {
        high: { text: "Your infrastructure is ready for AI. Explore compliant cloud AI tools for clinical decision support, fraud detection, or automated case management.", examples: "Clinical AI diagnostic tools, regulatory reporting automation, fraud detection platforms" },
        medium: { text: "Upgrade to cloud services with compliance certifications relevant to your industry.", examples: "Compliant cloud storage, encrypted reporting tools, secure document management systems" },
        low: { text: "Start with foundational IT upgrades that meet your industry's security and compliance requirements.", examples: "Upgrade hardware, establish compliant cloud storage, secure remote access for staff" }
      },
      dataQuality: {
        high: { text: "Your data is well-organized. Use it for predictive analytics and AI-driven insights in your field.", examples: "Patient outcome prediction, financial risk modeling, automated public service reporting" },
        medium: { text: "Centralize and standardize your data, particularly across regulated record systems.", examples: "Unified patient or client record systems, standardized financial data formats, consolidated case records" },
        low: { text: "Start by auditing and cleaning up your core records and making them consistently structured.", examples: "Remove duplicate records, establish consistent data entry standards across departments" }
      },
      teamLiteracy: {
        high: { text: "Your team understands AI well. Focus on applying it responsibly within your regulated environment.", examples: "AI-assisted diagnostics, automated compliance monitoring, AI-driven case management tools" },
        medium: { text: "Train key staff on AI tools relevant to your industry's workflows and compliance requirements.", examples: "AI compliance courses, workshops on responsible AI use in regulated environments" },
        low: { text: "Start with foundational AI education focused on your industry's applications and obligations.", examples: "AI basics for healthcare, finance, or government staff; compliance-aware AI workshops" }
      },
      systemIntegration: {
        high: { text: "Your systems connect well and can support AI-driven data flows across your operations.", examples: "Integrated clinical, financial, or government platforms; AI-connected reporting and analytics systems" },
        medium: { text: "Improve connections between your core operational systems to enable reliable data sharing.", examples: "Connect patient records with billing and reporting systems, integrate case management platforms" },
        low: { text: "Focus on getting your core systems to share information reliably before adding AI.", examples: "Connect case management and payment systems, establish data sharing between departments" }
      },
      budget: {
        high: { text: "Your resources are well-positioned for AI. Consider compliance-focused platforms with strong ROI in your sector.", examples: "Enterprise AI diagnostic tools, regulatory reporting automation, audit management systems" },
        medium: { text: "Identify AI investments that address compliance efficiency and reduce operational costs.", examples: "Compliance automation tools, AI-assisted audit software, automated reporting platforms" },
        low: { text: "Start with small, targeted AI investments that reduce compliance costs or administrative burden.", examples: "Simple document processing tools, automated reporting software, low-cost AI form tools" }
      },
      dataSecurity: {
        high: { text: "Your security posture is strong. Focus on AI-specific controls for sensitive data processing.", examples: "Privacy-preserving AI models, compliant AI analytics platforms, audit trail systems" },
        medium: { text: "Strengthen your data security to meet AI-specific requirements in your regulated environment.", examples: "Data anonymization tools, access control upgrades, encryption for AI data pipelines" },
        low: { text: "Address foundational security gaps before using AI with sensitive data.", examples: "Implement access controls, apply encryption to sensitive records, conduct a security audit" }
      }
    },
    customerFacing: {
      technologyInfrastructure: {
        high: { text: "Your technology is ready for AI-powered customer experiences. Focus on personalization and demand forecasting.", examples: "Personalization engines, AI demand forecasting tools, automated customer service systems" },
        medium: { text: "Upgrade your customer-facing systems to support AI-driven personalization and automation.", examples: "Cloud-based e-commerce tools, AI chatbot platforms, marketing automation software" },
        low: { text: "Start with basic technology upgrades to support more consistent customer data and interactions.", examples: "Modernize your website and point-of-sale systems, upgrade to cloud-based CRM" }
      },
      dataQuality: {
        high: { text: "Your customer data is well-structured. Use it to power personalization, churn prediction, and demand planning.", examples: "Customer segmentation models, AI product recommendations, churn prediction tools" },
        medium: { text: "Unify your customer data across channels to create consistent profiles for AI applications.", examples: "Connect your CRM, e-commerce, and marketing platforms into a unified customer database" },
        low: { text: "Start by cleaning up and consolidating your customer records across sales, service, and marketing.", examples: "Remove duplicate contacts, standardize purchase history records, centralize customer data" }
      },
      teamLiteracy: {
        high: { text: "Your team is AI-savvy. Focus on advanced customer analytics, campaign optimization, and AI-assisted selling.", examples: "AI-powered sales coaching tools, advanced customer analytics, automated campaign optimization" },
        medium: { text: "Train marketing, sales, and service teams on AI tools relevant to customer engagement.", examples: "AI marketing tools workshops, training on CRM AI features, AI customer service platforms" },
        low: { text: "Start with practical AI education focused on customer-facing tools your team can use right away.", examples: "AI product recommendation basics, CRM automation training, AI chatbot setup guides" }
      },
      systemIntegration: {
        high: { text: "Your systems are well-connected. Use that foundation to enable intelligent automation across the customer journey.", examples: "AI-connected CRM and inventory, automated lead scoring, unified customer analytics dashboards" },
        medium: { text: "Connect your CRM, e-commerce, and marketing platforms so customer data flows consistently.", examples: "Link online and in-store sales data, connect marketing platforms to your CRM" },
        low: { text: "Focus on getting your core customer systems to share data before implementing AI.", examples: "Connect sales, inventory, and customer service systems; sync online and offline records" }
      },
      budget: {
        high: { text: "Your AI investment capacity is strong. Prioritize tools that drive revenue through better customer experiences.", examples: "AI personalization platforms, predictive analytics for sales, automated marketing tools" },
        medium: { text: "Focus AI spending on tools with a clear customer acquisition or retention ROI.", examples: "AI-powered CRM features, email marketing automation, AI product recommendation tools" },
        low: { text: "Start with low-cost AI tools that have a direct impact on sales or customer experience.", examples: "Free-tier AI chatbots, basic email automation, AI-enhanced product search" }
      },
      dataSecurity: {
        high: { text: "Your security is solid. Ensure AI tools comply with customer data privacy regulations and consent requirements.", examples: "Privacy-compliant AI personalization tools, consent management platforms, encrypted data pipelines" },
        medium: { text: "Strengthen customer data protection before expanding AI use across customer touchpoints.", examples: "Implement consent management, encrypt customer purchase history, tighten CRM access controls" },
        low: { text: "Address basic customer data security before applying AI to customer interactions.", examples: "Enforce password policies, restrict access to customer records, review data retention practices" }
      }
    },
    operationsHeavy: {
      technologyInfrastructure: {
        high: { text: "Your infrastructure is ready for AI in operations. Explore predictive maintenance, route optimization, and process automation.", examples: "Predictive maintenance platforms, AI fleet and route optimization, automated production monitoring" },
        medium: { text: "Upgrade your operational technology to support AI-driven monitoring and decision support.", examples: "Cloud-connected equipment monitoring, digital work order systems, automated reporting tools" },
        low: { text: "Start with basic technology upgrades to create a digital foundation for future AI applications.", examples: "Add equipment sensors, upgrade to cloud-based scheduling, digitize paper-based processes" }
      },
      dataQuality: {
        high: { text: "Your operational data is well-structured. Use it for predictive analytics and process optimization.", examples: "Equipment failure prediction models, production efficiency analytics, yield optimization tools" },
        medium: { text: "Organize and centralize data from equipment, jobs, and logistics to enable AI-driven insights.", examples: "Centralize maintenance logs, standardize production data formats, consolidate dispatch records" },
        low: { text: "Start by digitizing and organizing your core operational records consistently.", examples: "Move paper logs to digital systems, standardize equipment data entry, audit existing databases" }
      },
      teamLiteracy: {
        high: { text: "Your team understands AI well. Focus on advanced operational applications like predictive maintenance and process automation.", examples: "AI-driven equipment diagnostics, automated route planning tools, AI production optimization" },
        medium: { text: "Train operations, field, and management staff on practical AI tools for your workflows.", examples: "Workshops on AI scheduling tools, training on equipment monitoring dashboards, AI safety systems" },
        low: { text: "Start with foundational AI training for field and operations teams using practical, hands-on examples.", examples: "AI basics workshops for operations staff, demonstrations of AI scheduling and monitoring tools" }
      },
      systemIntegration: {
        high: { text: "Your systems are well-connected. Leverage this to create end-to-end operational intelligence across your supply chain.", examples: "AI-integrated ERP and field systems, connected logistics and inventory, real-time production dashboards" },
        medium: { text: "Connect your operations, scheduling, and logistics systems to enable reliable data sharing for AI.", examples: "Link field equipment data with maintenance systems, connect dispatch and inventory platforms" },
        low: { text: "Focus on getting your core operational systems to share data before adding AI capabilities.", examples: "Connect scheduling and billing systems, integrate maintenance logs with procurement data" }
      },
      budget: {
        high: { text: "Your resources are well-suited for AI investment. Prioritize tools that reduce downtime, waste, and operational costs.", examples: "Predictive maintenance platforms, AI fleet optimization, automated production scheduling" },
        medium: { text: "Focus AI spending on tools with measurable efficiency or cost reduction impact in your operations.", examples: "Equipment monitoring software, AI-assisted scheduling tools, route optimization platforms" },
        low: { text: "Start with a small AI pilot in one operational area to demonstrate ROI before broader investment.", examples: "Simple equipment monitoring tools, basic scheduling automation, AI-assisted dispatch software" }
      },
      dataSecurity: {
        high: { text: "Your security is strong. Ensure AI tools are secured across both IT and operational technology environments.", examples: "Secure AI equipment monitoring platforms, protected supply chain data systems, OT cybersecurity tools" },
        medium: { text: "Strengthen data protection across your operational and field systems before expanding AI use.", examples: "Secure field device connections, restrict access to operational data, review vendor data sharing agreements" },
        low: { text: "Start with foundational security controls covering your field and operational systems.", examples: "Implement access controls on operational platforms, secure equipment data connections, train staff on data hygiene" }
      }
    },
    knowledge: {
      technologyInfrastructure: {
        high: { text: "Your technology is ready for advanced AI tools. Explore automation, analytics, and AI-assisted delivery.", examples: "Automated workflows, AI research tools, analytics dashboards for client or program insights" },
        medium: { text: "Upgrade to cloud computing and ensure reliable, scalable infrastructure for knowledge work.", examples: "Cloud collaboration tools, automated reporting systems, scalable document storage" },
        low: { text: "Start with foundational technology upgrades to support better data management and collaboration.", examples: "Upgrade hardware and internet, move to secure cloud storage, adopt cloud-based productivity tools" }
      },
      dataQuality: {
        high: { text: "Your data is well-organized and accessible. Ready for advanced AI applications and insights.", examples: "Client trend analysis, program outcome modeling, AI-assisted research and reporting" },
        medium: { text: "Organize your data better with centralized storage and consistent formats.", examples: "Shared knowledge bases, automated data backups, standardized document naming conventions" },
        low: { text: "Start by cleaning up and organizing your core data and documents.", examples: "Remove duplicate records, create consistent filing systems, audit what data you have and where it lives" }
      },
      teamLiteracy: {
        high: { text: "Your team understands AI well. Focus on specialized applications for your field of work.", examples: "AI-assisted research tools, automated client reporting, intelligent document analysis" },
        medium: { text: "Train key staff on AI tools relevant to your core workflows.", examples: "AI writing and research tools for staff, workshops on AI business applications, prompt engineering basics" },
        low: { text: "Start with practical AI education your whole team can apply immediately.", examples: "AI productivity basics, lunch-and-learn on AI writing tools, introductory AI for your industry" }
      },
      systemIntegration: {
        high: { text: "Your systems work well together and can support sophisticated AI-driven workflows.", examples: "AI-connected CRM and project tools, automated client reporting, intelligent knowledge management systems" },
        medium: { text: "Improve how your business systems connect to enable better data sharing and workflow automation.", examples: "Link your CRM and project management tools, integrate billing and reporting platforms" },
        low: { text: "Focus on getting your core systems to share information reliably before adding AI.", examples: "Ensure sales and finance software can share data, connect your main operational platforms" }
      },
      budget: {
        high: { text: "Your resources are ready for comprehensive AI investment. Focus on tools that improve delivery quality and efficiency.", examples: "Enterprise AI productivity platforms, AI-powered research tools, intelligent knowledge management" },
        medium: { text: "Identify AI tools with a clear productivity or quality ROI for your core work.", examples: "AI writing and summarization tools, automated report generation, AI-assisted client communication" },
        low: { text: "Start with low-cost AI tools that create immediate productivity gains in your day-to-day work.", examples: "Free AI writing assistants, basic automation tools, AI-powered meeting summarizers" }
      },
      dataSecurity: {
        high: { text: "Your security posture is strong. Ensure AI tools meet your client confidentiality and data handling obligations.", examples: "Privacy-compliant AI platforms, secure document AI tools, encrypted client data pipelines" },
        medium: { text: "Strengthen data protection before expanding AI use with client or sensitive organizational data.", examples: "Implement data anonymization, tighten access controls on client records, review vendor data practices" },
        low: { text: "Address foundational security gaps before using AI with sensitive client or organizational data.", examples: "Enforce access controls, review data storage practices, ensure staff understand data handling responsibilities" }
      }
    }
  };

  return all[cluster];
};

// Helper function to get dynamic color based on score
const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'; // High (Green): 4.0+/5
  if (score >= 50) return 'text-yellow-600'; // Medium (Yellow): 2.5-3.9/5
  return 'text-red-600'; // Low (Red): 0.0-2.4/5
};

export default function Report({ assessment, onBack }: ReportProps) {
  const { organizationName, overallScore, scores, createdAt, industry } = assessment;
  const dimensionRecommendations = getDimensionRecommendations(industry);
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
                const baseConfig = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const config = { ...baseConfig, recommendations: (dimensionRecommendations as any)[dimension] ?? baseConfig.recommendations };
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
                      <div className="text-slate-700 mb-2">{config.recommendations[level].text}</div>
                      <div className="font-medium text-slate-900">Examples:</div>
                      <div className="text-slate-600 italic">{config.recommendations[level].examples}</div>
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

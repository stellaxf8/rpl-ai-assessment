import { CheckCircle, Download, RotateCcw, Target, AlertTriangle, Server, Database, Users, Network, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Assessment, DimensionScores } from "@shared/schema";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";
import BusinessDevelopment from "@/components/enhanced/business-development";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResultsProps {
  assessment: Assessment;
  onRetakeAssessment?: () => void;
  showRetakeButton?: boolean;
}

const dimensionConfig = {
  technologyInfrastructure: {
    label: "Technology Infrastructure",
    icon: "Server",
    color: "bg-blue-100 text-primary",
    barColor: "bg-blue-500",
    recommendations: {
      high: "Consider upgrading to AI-optimized compute instances for better performance.",
      medium: "Evaluate current infrastructure capabilities and plan for AI-specific resources.",
      low: "Significant infrastructure investment needed before AI implementation."
    }
  },
  dataQuality: {
    label: "Data Quality & Access",
    icon: "Database",
    color: "bg-green-100 text-success",
    barColor: "bg-success",
    recommendations: {
      high: "Leverage existing data governance to accelerate AI projects.",
      medium: "Implement data quality framework and establish clear access protocols.",
      low: "Priority focus on data governance and quality standards required."
    }
  },
  teamLiteracy: {
    label: "Team AI Literacy",
    icon: "Users",
    color: "bg-purple-100 text-secondary",
    barColor: "bg-green-500",
    recommendations: {
      high: "Leverage this strong foundation to drive AI initiatives across the organization.",
      medium: "Invest in targeted AI training programs for key team members.",
      low: "Comprehensive AI education and training program needed."
    }
  },
  systemIntegration: {
    label: "System Integration",
    icon: "Network",
    color: "bg-orange-100 text-warning",
    barColor: "bg-warning",
    recommendations: {
      high: "Ready for complex AI integrations with existing systems.",
      medium: "Review integration capabilities and plan for AI system compatibility.",
      low: "System integration strategy and API development required."
    }
  },
  budget: {
    label: "Budget & Resources",
    icon: "DollarSign",
    color: "bg-yellow-100 text-yellow-600",
    barColor: "bg-yellow-500",
    recommendations: {
      high: "Well-positioned to fund comprehensive AI initiatives.",
      medium: "Allocate additional resources for AI infrastructure and training.",
      low: "Develop comprehensive budget plan for AI implementation."
    }
  },
  dataSecurity: {
    label: "Data Security & Privacy",
    icon: "Shield",
    color: "bg-red-100 text-error",
    barColor: "bg-error",
    recommendations: {
      high: "Excellent security posture with strong cybersecurity framework, privacy governance, and data anonymization capabilities for AI.",
      medium: "Strengthen cybersecurity controls, improve privacy compliance, and implement data anonymization frameworks for AI projects.",
      low: "Establish comprehensive security framework, privacy compliance program, and data anonymization capabilities for AI datasets."
    }
  },
};

const renderIcon = (iconName: string, className: string = "w-4 h-4") => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Server,
    Database,
    Users,
    Network,
    DollarSign,
    Shield
  };
  
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : <span>{iconName}</span>;
};

export default function Results({ assessment, onRetakeAssessment, showRetakeButton = true }: ResultsProps) {
  const { overallScore, scores, organizationName, contactEmail, industry } = assessment;
  const typedScores = scores as DimensionScores;

  const getReadinessLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 65) return { label: "Good", color: "bg-blue-100 text-blue-800" };
    if (score >= 50) return { label: "Fair", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" };
  };

  const getScoreLevel = (score: number): 'high' | 'medium' | 'low' => {
    if (score >= 4.0) return 'high';
    if (score >= 2.5) return 'medium';
    return 'low';
  };

  const readinessLevel = getReadinessLevel(overallScore);

  const getRecommendations = () => {
    const dimensionEntries = Object.entries(typedScores);
    const lowScoring = dimensionEntries.filter(([_, score]) => score < 3.5);
    const highScoring = dimensionEntries.filter(([_, score]) => score >= 4.0);

    return { lowScoring, highScoring };
  };

  const { lowScoring, highScoring } = getRecommendations();

  const getTopActionItems = () => {
    // Get all dimensions with their scores and sort by lowest score first
    const allDimensions = Object.entries(typedScores)
      .map(([dimension, score]) => ({
        dimension: dimension as keyof typeof dimensionConfig,
        score: score as number,
        config: dimensionConfig[dimension as keyof typeof dimensionConfig]
      }))
      .sort((a, b) => a.score - b.score);

    // Take the top 3 lowest scoring dimensions
    const top3Lowest = allDimensions.slice(0, 3);

    return top3Lowest.map((item, index) => {
      const level = getScoreLevel(item.score);
      const urgency = index === 0 ? "Critical" : index === 1 ? "High" : "Medium";
      
      // Generate specific action items based on dimension and score level
      const actionItems = {
        technologyInfrastructure: {
          high: "Upgrade to AI-optimized cloud instances and implement GPU computing",
          medium: "Audit current infrastructure and plan scalable AI computing resources",
          low: "Establish foundational cloud infrastructure with AI-ready capabilities"
        },
        dataQuality: {
          high: "Implement advanced data governance policies and automated quality monitoring",
          medium: "Create data quality framework and establish data access protocols",
          low: "Start with basic data inventory and implement data cleansing processes"
        },
        teamLiteracy: {
          high: "Develop AI leadership program and establish centers of excellence",
          medium: "Launch comprehensive AI training program for key staff members",
          low: "Begin with AI fundamentals training and hire AI-experienced personnel"
        },
        systemIntegration: {
          high: "Design sophisticated AI integration architecture with existing systems",
          medium: "Evaluate current system APIs and plan integration roadmap",
          low: "Modernize legacy systems and establish API-first architecture"
        },
        budget: {
          high: "Allocate dedicated AI transformation budget with multi-year planning",
          medium: "Secure additional budget for AI infrastructure and training",
          low: "Develop business case and seek approval for AI investment funding"
        },
        dataSecurity: {
          high: "Enhance AI-specific security controls and advanced privacy-preserving techniques",
          medium: "Strengthen cybersecurity framework and implement privacy compliance with data anonymization",
          low: "Establish foundational security controls, privacy compliance, and data protection capabilities"
        }
      };

      return {
        title: item.config.label,
        action: actionItems[item.dimension][level],
        urgency,
        score: item.score,
        icon: item.config.icon,
        priority: index + 1
      };
    });
  };

  const topActionItems = getTopActionItems();

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary container with the report content
      const reportContent = document.createElement('div');
      reportContent.setAttribute('data-report-content', 'true');
      reportContent.innerHTML = `
        <div style="padding: 60px; background: white; font-family: Arial, sans-serif; min-height: 100vh;">
          <!-- Report Header -->
          <div style="padding: 32px; color: white; background: linear-gradient(135deg, #cd0000 0%, #a50000 100%); margin-bottom: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(205, 0, 0, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 8px; margin-top: 0; letter-spacing: -0.5px;">AI Readiness Assessment Report</h1>
                <p style="margin: 4px 0; opacity: 0.9; font-size: 14px;">Comprehensive analysis and strategic recommendations</p>
                <p style="margin: 4px 0; opacity: 0.9; font-size: 14px; font-weight: 500;">Organization: ${organizationName}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 18px; font-weight: bold;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div style="opacity: 0.9; font-size: 12px;">Assessment Date</div>
              </div>
            </div>
          </div>
          
          <!-- Executive Summary Section -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 16px; border-bottom: 3px solid #cd0000; padding-bottom: 8px;">Executive Summary</h2>
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0;">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
                <div style="text-align: center; padding: 16px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 32px; font-weight: bold; margin-bottom: 8px; color: ${overallScore >= 80 ? '#16a34a' : overallScore >= 50 ? '#ca8a04' : '#dc2626'};">${overallScore}</div>
                  <div style="font-size: 12px; color: #64748b; font-weight: 600;">OVERALL SCORE</div>
                  <div style="font-size: 10px; color: #94a3b8;">out of 100</div>
                </div>
                <div style="text-align: center; padding: 16px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: ${overallScore >= 80 ? '#16a34a' : overallScore >= 65 ? '#ca8a04' : '#dc2626'};">
                    ${overallScore >= 80 ? "Excellent" : overallScore >= 65 ? "Good" : overallScore >= 50 ? "Fair" : "Poor"}
                  </div>
                  <div style="font-size: 12px; color: #64748b; font-weight: 600;">READINESS LEVEL</div>
                  <div style="font-size: 10px; color: #94a3b8;">AI implementation readiness</div>
                </div>
                <div style="text-align: center; padding: 16px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 32px; font-weight: bold; margin-bottom: 8px; color: #ca8a04;">
                    ${Math.max(Object.values(typedScores).filter((score: any) => score < 3.9).length, 1)}
                  </div>
                  <div style="font-size: 12px; color: #64748b; font-weight: 600;">GROWTH OPPORTUNITIES</div>
                  <div style="font-size: 10px; color: #94a3b8;">for acceleration</div>
                </div>
              </div>
              <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #cd0000;">
                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 14px; font-weight: 500;">
                  ${overallScore >= 80 ? "Your organization demonstrates excellent AI readiness with strong capabilities across all dimensions. You're well-positioned for successful AI implementation with minimal preparation required." : 
                    overallScore >= 65 ? "Your organization shows good AI readiness with strong potential for successful implementation. Focus on addressing the identified improvement areas to maximize your AI initiative's success." :
                    overallScore >= 50 ? "Your organization has a fair foundation for AI implementation. While basic capabilities are in place, significant improvement in several areas will be needed before proceeding with AI initiatives." :
                    "Your organization currently has limited AI readiness. Substantial preparation and capability building will be required across multiple dimensions before AI implementation can be successful."}
                </p>
              </div>
            </div>
          </div>

          <!-- Top 3 Action Items Section -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 16px; border-bottom: 3px solid #cd0000; padding-bottom: 8px;">Priority Action Items</h2>
            <div style="display: grid; gap: 16px;">
              ${topActionItems.map((item, index) => `
                <div style="border: 2px solid ${
                  index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'
                }; border-radius: 12px; padding: 20px; background: ${
                  index === 0 ? '#fef2f2' : index === 1 ? '#fffbeb' : '#eff6ff'
                }; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: ${
                    index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'
                  };"></div>
                  <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 16px; font-weight: bold; margin-right: 12px; color: ${
                      index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'
                    };">${item.priority}.</span>
                    <div style="flex: 1;">
                      <span style="font-weight: 700; font-size: 16px; color: #1e293b;">${item.title}</span>
                      <div style="display: flex; align-items: center; margin-top: 4px;">
                        <span style="font-size: 12px; color: #64748b; margin-right: 8px;">Current Score:</span>
                        <span style="font-weight: 600; font-size: 14px; color: ${
                          item.score >= 4.0 ? '#16a34a' : item.score >= 2.5 ? '#ca8a04' : '#dc2626'
                        };">${item.score.toFixed(1)}/5</span>
                      </div>
                    </div>
                  </div>
                  <p style="font-size: 13px; color: #374151; margin: 0; line-height: 1.5; padding-left: 40px;">
                    ${item.action}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dimension Analysis Section -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 16px; border-bottom: 3px solid #cd0000; padding-bottom: 8px;">Detailed Dimension Analysis</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              ${Object.entries(typedScores).map(([dimension, score]) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const level = scoreValue >= 4.0 ? 'high' : scoreValue >= 2.5 ? 'medium' : 'low';
                const percentage = (scoreValue / 5) * 100;
                
                return `
                  <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-size: 24px; margin-right: 12px;">${
                          config.icon === 'Server' ? '⚙' :
                          config.icon === 'Database' ? '⬡' :
                          config.icon === 'Users' ? '◉' :
                          config.icon === 'Network' ? '⧈' :
                          config.icon === 'DollarSign' ? '$' :
                          config.icon === 'Shield' ? '⬢' : config.icon
                        }</span>
                        <h3 style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.3;">${config.label}</h3>
                      </div>
                      <div style="text-align: right;">
                        <div style="font-size: 18px; font-weight: bold; color: ${level === 'high' ? '#16a34a' : level === 'medium' ? '#ca8a04' : '#dc2626'}; margin-bottom: 4px;">${scoreValue.toFixed(1)}/5</div>
                        <div style="width: 60px; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                          <div style="height: 8px; background: ${level === 'high' ? '#16a34a' : level === 'medium' ? '#ca8a04' : '#dc2626'}; border-radius: 4px; width: ${percentage}%; transition: width 0.3s ease;"></div>
                        </div>
                      </div>
                    </div>
                    <div style="margin-bottom: 12px;">
                      <div style="font-size: 12px; color: #64748b; margin-bottom: 8px; font-weight: 600;">ASSESSMENT:</div>
                      <p style="font-size: 12px; color: #475569; margin: 0; line-height: 1.4;">
                        ${level === 'high' 
                          ? "Strong performance with excellent foundation for AI implementation. This dimension shows readiness for advanced AI initiatives."
                          : level === 'medium'
                          ? "Moderate performance with good potential. Some improvements needed to optimize AI implementation success."
                          : "Significant improvement opportunities identified. Focus on building capabilities in this area before AI implementation."
                        }
                      </p>
                    </div>
                    <div style="padding: 12px; border-radius: 8px; border-left: 4px solid ${
                      level === 'high' ? '#16a34a' : level === 'medium' ? '#ca8a04' : '#dc2626'
                    }; background: ${
                      level === 'high' ? '#f0fdf4' : level === 'medium' ? '#fefce8' : '#fef2f2'
                    };">
                      <div style="font-weight: 600; color: #1e293b; margin-bottom: 6px; font-size: 11px;">RECOMMENDATION:</div>
                      <div style="color: #374151; font-size: 11px; line-height: 1.4;">${config.recommendations[level]}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- Contact Information -->
          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
            <p style="color: #64748b; margin: 0; font-size: 12px;">Need help implementing these recommendations? Contact Red Pill Labs: www.redpilllabs.com/contact-us</p>
          </div>
        </div>
      `;
      
      // Add to DOM temporarily
      document.body.appendChild(reportContent);
      
      // Create canvas from the report element
      const canvas = await html2canvas(reportContent, {
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
      
      // Remove temporary element
      document.body.removeChild(reportContent);
      
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  return (
    <section>
      {/* Overall Score Card */}
      <Card className="mb-8 animate-slide-up animate-fade-in">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 animate-slide-up animate-fade-in"><span style={{color: '#cd0000', fontFamily: 'Arial Black', fontWeight: 'bold'}}>AI Readiness</span> Score</h2>
            <p className="text-sm sm:text-base text-slate-600 animate-slide-up animate-fade-in">Complete AI readiness assessment for {organizationName}</p>
          </div>
          
          <div className="flex items-center justify-center mb-8 animate-bounce-subtle animate-fade-in">
            <ScoreChart score={overallScore} />
          </div>

          <div className="text-center animate-slide-up stagger-delay-3">
            <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium ${readinessLevel.color}`}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {readinessLevel.label} AI Readiness Level
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Action Items */}
      <Card className="mb-8 animate-slide-up animate-fade-in">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center">
              <Target className="mr-3 h-6 w-6 text-[#cd0000]" />
              <span style={{color: '#cd0000', fontFamily: 'Arial Black', fontWeight: 'bold'}}>Top 3 Action Items</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600">Prioritized recommendations to improve your AI readiness</p>
          </div>

          <div className="space-y-4">
            {topActionItems.map((item, index) => (
              <div key={item.title} className={`border rounded-lg p-4 sm:p-6 ${
                index === 0 ? 'border-red-200 bg-red-50' :
                index === 1 ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              } animate-slide-up animate-fade-in`}>
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-red-500' :
                    index === 1 ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}>
                    {item.priority}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="mr-2">{renderIcon(item.icon, "w-5 h-5")}</span>
                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          item.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                          item.urgency === 'High' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item.urgency} Priority
                        </span>
                        <span className="ml-2 text-sm text-slate-600">
                          Score: {item.score.toFixed(1)}/5
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 text-sm sm:text-base">
                      {item.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-lg">
              <AlertTriangle className="mr-2 h-4 w-4 text-slate-600" />
              <span className="text-sm text-slate-600">
                Focus on Priority 1 and 2 items for maximum impact on your AI readiness
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Results Overview */}
      <div className="space-y-8">
          {/* Dimension Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Radar Chart */}
            <Card className="animate-slide-in-left animate-fade-in">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6 animate-slide-up animate-fade-in">Readiness Dimensions</h3>
                <div className="h-60 sm:h-80 animate-fade-in">
                  <RadarChart scores={scores as any} />
                </div>
              </CardContent>
            </Card>

            {/* Brief Scores Overview */}
            <Card className="animate-slide-in-right animate-fade-in">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6 animate-slide-up animate-fade-in">Quick Overview</h3>
                <div className="space-y-4 animate-slide-up stagger-delay-2">
                  {Object.entries(scores as any).map(([dimension, score], index) => {
                    const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                    const scoreValue = score as number;
                    const percentage = (scoreValue / 5) * 100;

                    // Determine bar color based on score value (dynamic)
                    let barColorClass = 'bg-red-500'; // Default to red for low scores
                    if (scoreValue >= 4.0) {
                      barColorClass = 'bg-green-600'; // High score: green (4.0+)
                    } else if (scoreValue >= 2.5) {
                      barColorClass = 'bg-yellow-500'; // Medium score: yellow (2.5-3.9)
                    } else {
                      barColorClass = 'bg-red-500'; // Low score: red (0.0-2.4)
                    }

                    return (
                      <div key={dimension} className={`flex items-center justify-between animate-slide-in-left stagger-delay-${Math.min(index + 3, 6)}`}>
                        <div className="flex items-center flex-1">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${config?.color || 'bg-gray-100'}`}>
                            {renderIcon(config?.icon || 'Server', "w-4 h-4")}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{config?.label || dimension}</div>
                            <div className="text-sm text-slate-600">
                              {scoreValue >= 4.0 
                                ? "Strong performance" 
                                : scoreValue >= 3.0 
                                ? "Room for improvement" 
                                : "Needs attention"
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center ml-4">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-3 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${barColorClass}`} 
                              style={{ 
                                width: `${Math.max(0, Math.min(100, percentage))}%`
                              }}
                            />
                          </div>
                          <span className="font-semibold text-slate-900 min-w-[2rem]">
                            {scoreValue.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Dimension Analysis */}
          <div className="mb-6 sm:mb-8 animate-slide-up animate-fade-in">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6 text-center animate-slide-up animate-fade-in">Detailed Dimension Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {Object.entries(scores as any).map(([dimension, score], index) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const level = getScoreLevel(scoreValue);
                const percentage = (scoreValue / 5) * 100;

                return (
                  <Card key={dimension} className={`border border-slate-200 animate-slide-up animate-fade-in`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            {renderIcon(config.icon, "w-5 h-5")}
                          </div>
                          <h4 className="text-base sm:text-lg font-semibold text-slate-900">{config.label}</h4>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 mr-3">
                            <Progress 
                              value={percentage} 
                              className="h-3 bg-slate-200" 
                              dynamicColor={true}
                            />
                          </div>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">{scoreValue.toFixed(1)}/5</span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-slate-600 mb-3">
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
                        <div className="font-medium text-slate-900 text-sm sm:text-base">Recommendation:</div>
                        <div className="text-slate-700 text-sm sm:text-base">{config.recommendations[level]}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <BusinessDevelopment scores={{
            overallScore: overallScore,
            technologyInfrastructure: typedScores.technologyInfrastructure,
            dataQuality: typedScores.dataQuality,
            teamLiteracy: typedScores.teamLiteracy,
            systemIntegration: typedScores.systemIntegration,
            budget: typedScores.budget,
            dataSecurity: typedScores.dataSecurity
          }} />
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-in animate-slide-up">
        <Button onClick={handleDownloadPDF} size="lg" className="hover-lift button-press w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Download Report
        </Button>

        {showRetakeButton && onRetakeAssessment && (
          <Button variant="ghost" onClick={onRetakeAssessment} className="hover-lift button-press w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Assessment
          </Button>
        )}
      </div>
    </section>
  );
}

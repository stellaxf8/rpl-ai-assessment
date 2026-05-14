import React, { useState, useEffect } from "react";
import { CheckCircle, Download, RotateCcw, Target, AlertTriangle, Server, Database, Users, Network, DollarSign, Shield, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Assessment, DimensionScores } from "@shared/schema";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";
import BusinessDevelopment from "@/components/enhanced/business-development";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import redPillLabsLogo from "@assets/LOGO (White - PNG)_1757717696589.png";

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
    icon: "Database",
    color: "bg-green-100 text-success",
    barColor: "bg-success",
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
    icon: "Users",
    color: "bg-purple-100 text-secondary",
    barColor: "bg-green-500",
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
    icon: "Network",
    color: "bg-orange-100 text-warning",
    barColor: "bg-warning",
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
    icon: "DollarSign",
    color: "bg-yellow-100 text-yellow-600",
    barColor: "bg-yellow-500",
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
    icon: "Shield",
    color: "bg-red-100 text-error",
    barColor: "bg-error",
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

const renderIcon = (iconName: string, className: string = "w-4 h-4") => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Server,
    Database,
    Users,
    Network,
    DollarSign,
    Shield
  };
  
  // Make ALL icons black
  const combinedClassName = `${className} text-black`.trim();
  
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={combinedClassName} /> : <span>{iconName}</span>;
};

export default function Results({ assessment, onRetakeAssessment, showRetakeButton = true }: ResultsProps) {
  const [email, setEmail] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [showFullInsights, setShowFullInsights] = useState(false);
  /* Exit Intent Feature - Disabled
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentShown, setExitIntentShown] = useState(false);
  const [exitEmail, setExitEmail] = useState("");
  const [exitContactConsent, setExitContactConsent] = useState(false);
  */
  const { toast } = useToast();

  /* Exit intent detection - Disabled
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger exit intent when mouse leaves viewport at the top and user hasn't provided email
      if (e.clientY <= 0 && !exitIntentShown && !showFullInsights && !email) {
        setShowExitIntent(true);
        setExitIntentShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentShown, showFullInsights, email]);
  */

  // Email request mutation
  const emailRequest = useMutation({
    mutationFn: async (data: { assessmentId: string; email: string; contactConsent: boolean }) => {
      const response = await apiRequest("POST", "/api/assessment-email-requests", data);
      return response.json();
    },
    onSuccess: () => {
      setShowFullInsights(true);
      toast({
        title: "Email submitted successfully!",
        description: "You can now download your report.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send email",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  /* Exit intent email request mutation - Disabled
  const exitEmailRequest = useMutation({
    mutationFn: async (data: { assessmentId: string; email: string; contactConsent: boolean }) => {
      const response = await apiRequest("POST", "/api/assessment-email-requests", data);
      return response.json();
    },
    onSuccess: () => {
      setShowExitIntent(false);
      setEmail(exitEmail);
      setContactConsent(exitContactConsent);
      setShowFullInsights(true);
      toast({
        title: "Success!",
        description: "Assessment report request received. Your detailed insights are now unlocked!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to send email request. Please try again.",
        variant: "destructive",
      });
    },
  });
  */

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
    console.log('Download PDF button clicked');
    try {
      // Detect if user is on mobile device
      const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Create a temporary container with the report content
      const reportContent = document.createElement('div');
      reportContent.setAttribute('data-report-content', 'true');
      
      if (isMobile) {
        // Mobile: use fixed width for consistent margins
        reportContent.style.cssText = 'position: fixed; top: 0; left: -9999px; width: 794px; height: auto; z-index: -1;';
      } else {
        // Desktop: use default behavior for wider margins
        reportContent.style.cssText = 'position: fixed; top: 0; left: -9999px; height: auto; z-index: -1;';
      }
      
      reportContent.innerHTML = `
        <div style="padding: 60px; background: white; font-family: Arial, sans-serif; min-height: 100vh; ${isMobile ? 'width: 100%; box-sizing: border-box;' : ''}">
          <!-- Report Header -->
          <div style="padding: 16px 32px 32px 32px; color: white; background: #cd0000; margin-bottom: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(205, 0, 0, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div style="display: flex; flex-direction: column; justify-content: flex-start;">
                <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 8px; margin-top: 0; letter-spacing: -0.5px;">AI Readiness Assessment Report</h1>
                <p style="margin: 4px 0; opacity: 0.9; font-size: 14px;">Comprehensive analysis and strategic recommendations</p>
                <p style="margin: 4px 0; opacity: 0.9; font-size: 14px; font-weight: 500;">Organization: ${organizationName}</p>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; padding-top: 18px;">
                <img src="${redPillLabsLogo}" alt="Red Pill Labs Logo" style="height: 36px; margin-bottom: 8px; filter: brightness(0) invert(1);" />
                <div>
                  <div style="font-size: 18px; font-weight: bold;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  <div style="opacity: 0.9; font-size: 12px;">Assessment Date</div>
                </div>
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
                <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #f8fafc;">
                  <div style="display: flex; align-items: flex-start; margin-bottom: 12px;">
                    <span style="font-size: 24px; font-weight: bold; margin-right: 16px; color: ${
                      index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'
                    };">${item.priority}</span>
                    <div style="flex: 1;">
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="margin-right: 12px; color: #000000; display: inline-flex; align-items: center; justify-content: center;">${
                          item.icon === 'Server' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>' :
                          item.icon === 'Database' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="m3 5 v14 a9 3 0 0 0 18 0 v-14"/><path d="m3 12a9 3 0 0 0 18 0"/></svg>' :
                          item.icon === 'Users' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21v-2a4 4 0 0 0-3-3.87"/><path d="m16 3.13a4 4 0 0 1 0 7.75"/></svg>' :
                          item.icon === 'Network' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.5 6 7.5 7.5-7.5 7.5"/><path d="m21 12H3"/><path d="m3 6 7.5 7.5L3 21"/></svg>' :
                          item.icon === 'DollarSign' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' :
                          item.icon === 'Shield' ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-8 7.5s-8-2.5-8-7.5c0-1.3.3-2.5.8-3.5L12 3l7.2 6.5c.5 1 .8 2.2 .8 3.5z"/></svg>' : item.icon
                        }</span>
                        <span style="font-weight: 700; font-size: 16px; color: #1e293b;">${item.title}</span>
                      </div>
                      <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 12px; color: ${
                          item.urgency === 'Critical' ? '#dc2626' :
                          item.urgency === 'High' ? '#ca8a04' :
                          '#2563eb'
                        }; background: ${
                          item.urgency === 'Critical' ? '#fef2f2' :
                          item.urgency === 'High' ? '#fffbeb' :
                          '#eff6ff'
                        }; padding: 2px 8px; border-radius: 4px; font-weight: 500; margin-right: 8px;">${item.urgency} Priority</span>
                        <span style="font-size: 12px; color: #64748b;">Score: ${item.score.toFixed(1)}/5</span>
                      </div>
                      <p style="font-size: 13px; color: #374151; margin: 0; line-height: 1.5;">
                        ${item.action}
                      </p>
                    </div>
                  </div>
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
                    <div style="margin-bottom: 16px;">
                      <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <span style="font-size: 20px; margin-right: 10px; color: black; display: inline-flex; align-items: center; justify-content: center;">${
                          config.icon === 'Server' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>' :
                          config.icon === 'Database' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="m3 5 v14 a9 3 0 0 0 18 0 v-14"/><path d="m3 12a9 3 0 0 0 18 0"/></svg>' :
                          config.icon === 'Users' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21v-2a4 4 0 0 0-3-3.87"/><path d="m16 3.13a4 4 0 0 1 0 7.75"/></svg>' :
                          config.icon === 'Network' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13.5 6 7.5 7.5-7.5 7.5"/><path d="m21 12H3"/><path d="m3 6 7.5 7.5L3 21"/></svg>' :
                          config.icon === 'DollarSign' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' :
                          config.icon === 'Shield' ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-8 7.5s-8-2.5-8-7.5c0-1.3.3-2.5.8-3.5L12 3l7.2 6.5c.5 1 .8 2.2 .8 3.5z"/></svg>' : config.icon
                        }</span>
                        <h3 style="font-size: 14px; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.3;">${config.label}</h3>
                      </div>
                      <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                          <div style="height: 8px; background: ${level === 'high' ? '#16a34a' : level === 'medium' ? '#ca8a04' : '#dc2626'}; border-radius: 4px; width: ${percentage}%; transition: width 0.3s ease;"></div>
                        </div>
                        <div style="font-size: 14px; font-weight: bold; color: ${level === 'high' ? '#16a34a' : level === 'medium' ? '#ca8a04' : '#dc2626'}; min-width: 40px;">${scoreValue.toFixed(1)}/5</div>
                      </div>
                    </div>
                    <div style="padding: 12px; border-radius: 8px; border-left: 4px solid ${
                      level === 'high' ? '#16a34a' : level === 'medium' ? '#ca8a04' : '#dc2626'
                    }; background: ${
                      level === 'high' ? '#f0fdf4' : level === 'medium' ? '#fefce8' : '#fef2f2'
                    };">
                      <div style="font-weight: 600; color: #1e293b; margin-bottom: 6px; font-size: 11px;">RECOMMENDATION:</div>
                      <div style="color: #374151; font-size: 11px; line-height: 1.4; margin-bottom: 8px;">${config.recommendations[level].text}</div>
                      <div style="font-weight: 600; color: #1e293b; margin-bottom: 4px; font-size: 10px;">EXAMPLES:</div>
                      <div style="color: #6b7280; font-size: 10px; line-height: 1.4; font-style: italic;">${config.recommendations[level].examples}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
          <!-- Contact Information -->
          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center;">
            <p style="color: #cd0000; font-weight: bold; margin: 0; font-size: 16px;">Need help implementing these recommendations? Email us at info@redpilllabs.com or call us Toll Free @ 1-866-745-5733</p>
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
      console.log('About to save PDF...');
      const filename = `AI-Readiness-Report-${(organizationName || 'Organization').replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      console.log('PDF filename:', filename);
      pdf.save(filename);
      console.log('PDF save command executed');
      
      // Remove temporary element
      document.body.removeChild(reportContent);
      console.log('PDF generation completed successfully');
      
    } catch (error) {
      console.error('PDF generation error:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-1 sm:py-2">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight" style={{ 
            color: '#cd0000',
            fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
          }}>
            Assessment Results
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-3 max-w-3xl mx-auto leading-relaxed">
            Here's your comprehensive AI readiness analysis with personalized recommendations
          </p>
          {organizationName && (
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
              <span className="text-sm font-medium text-slate-700">Organization: </span>
              <span className="ml-2 text-sm font-semibold text-slate-900">{organizationName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall Score Card */}
      <Card className="mb-4 animate-slide-up animate-fade-in">
        <CardContent className="p-3 sm:p-4 lg:p-5">
          <div className="text-center mb-3 sm:mb-4 animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-1 tracking-tight text-black" style={{ 
              fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
            }}>AI Readiness Score</h2>
            <p className="text-sm sm:text-base text-slate-600 animate-slide-up animate-fade-in">Complete AI readiness assessment for {organizationName}</p>
          </div>
          
          <div className="flex items-center justify-center mb-3 animate-bounce-subtle animate-fade-in">
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

      {/* Personalized Summary Paragraph */}
      <div className="border-l-4 border-[#cd0000] bg-blue-50 px-5 py-5 rounded-r-lg shadow-sm animate-fade-in">
        <p className="text-base text-slate-700 leading-relaxed">
          {overallScore >= 80
            ? "Your organization has a strong foundation for AI adoption. You have the infrastructure, data practices, and team readiness to move beyond experimentation into real implementation. The opportunity now is making sure your first AI initiatives are targeted at the right problems. A focused conversation about where to start can save months of trial and error."
            : overallScore >= 65
            ? "You're closer to AI-ready than most organizations at your stage. A few targeted improvements in your weaker dimensions could meaningfully accelerate what's possible. The gap between where you are and a successful AI pilot is smaller than you might think, but the order in which you address it matters."
            : overallScore >= 50
            ? "Your organization has real intent around AI but a few foundational gaps that, if left unaddressed, will limit results even with the right tools in place. The good news is these gaps are common and fixable. Knowing which ones to prioritize first is usually what separates organizations that make progress from those that stall."
            : "Your results suggest AI adoption would be premature without some groundwork first, and that's actually useful to know now rather than after a costly rollout. Most organizations at this stage have 2 or 3 specific blockers that, once resolved, change the picture quickly. The first step is knowing exactly what those are."}
        </p>
      </div>

      {/* Assessment Results Overview */}
      <div className="space-y-8">
          {/* Dimension Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Radar Chart */}
            <Card className="animate-slide-in-left animate-fade-in">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-extrabold mb-4 sm:mb-6 text-center tracking-tight text-black" style={{ 
                  fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
                }}>Readiness Dimensions</h3>
                <div className="h-60 sm:h-80 animate-fade-in">
                  <RadarChart scores={scores as any} />
                </div>
              </CardContent>
            </Card>

            {/* Brief Scores Overview */}
            <Card className="animate-slide-in-right animate-fade-in">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-extrabold mb-4 sm:mb-6 text-center tracking-tight text-black" style={{ 
                  fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
                }}>Quick Overview</h3>
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
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-blue-100 text-primary">
                            {renderIcon(config?.icon || 'Server', "w-4 h-4")}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-900">{config?.label || dimension}</div>
                            <div className="text-sm text-slate-600 hidden sm:block">
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

          {/* Priority Action Items */}
          <Card className="mb-8 animate-slide-up animate-fade-in">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center">
                  <CheckCircle className="mr-3 h-6 w-6 text-slate-900" />
                  <span className="font-extrabold tracking-tight text-black" style={{ 
                    fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
                  }}>Priority Action Items</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-600">Prioritized recommendations to improve your AI readiness</p>
              </div>

              <div className="space-y-4">
                {topActionItems.map((item, index) => (
                  <div key={item.title} className={`border rounded-lg p-4 sm:p-6 border-slate-200 bg-slate-50 animate-slide-up animate-fade-in`}>
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 text-2xl font-bold mr-2 ${
                        index === 0 ? 'text-red-500' :
                        index === 1 ? 'text-yellow-500' :
                        'text-blue-500'
                      }`}>
                        {item.priority}
                      </div>
                      
                      <div className="flex-1">
                        <div className="mb-2">
                          <div className="flex items-center mb-1">
                            <span className="mr-2">{renderIcon(item.icon, "w-5 h-5")}</span>
                            <h4 className="font-semibold text-slate-900">{item.title}</h4>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              item.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                              item.urgency === 'High' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {item.urgency} Priority
                            </span>
                            <span className="text-sm text-slate-600">
                              Score: {item.score.toFixed(1)}/5
                            </span>
                          </div>
                        </div>
                        
                        {/* Action description - always visible */}
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

          {/* Detailed Dimension Analysis - Progressive Disclosure */}
          <div className="mb-6 sm:mb-8 animate-slide-up animate-fade-in relative">
            <h3 className="text-lg sm:text-xl font-extrabold mb-4 sm:mb-6 text-center tracking-tight text-black" style={{ 
              fontFamily: '"Inter", "Arial Nova Light", "Arial", sans-serif'
            }}>Detailed Dimension Analysis</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative">
              {Object.entries(scores as any).map(([dimension, score], index) => {
                const config = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const scoreValue = score as number;
                const level = getScoreLevel(scoreValue);
                const percentage = (scoreValue / 5) * 100;

                return (
                  <Card key={dimension} className="border border-slate-200 animate-slide-up animate-fade-in">
                    <CardContent className="p-3 sm:p-6">
                      <div className="mb-4">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 bg-blue-100 text-primary rounded-lg flex items-center justify-center mr-3">
                            {renderIcon(config.icon, "w-5 h-5")}
                          </div>
                          <h4 className="text-sm sm:text-lg font-semibold text-slate-900 leading-tight">{config.label}</h4>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 mr-3">
                            <Progress 
                              value={percentage} 
                              className="h-3 bg-slate-200" 
                              dynamicColor={true}
                            />
                          </div>
                          <span className="font-bold text-slate-900 text-sm sm:text-base">{scoreValue.toFixed(1)}/5</span>
                        </div>
                      </div>
                      
                      {/* Basic status always visible */}
                      <div className="text-slate-600 text-xs sm:text-base mb-3">
                        {scoreValue >= 4.0 
                          ? "Strong performance in this area" 
                          : scoreValue >= 3.0 
                          ? "Room for improvement" 
                          : "Needs attention"
                        }
                      </div>
                      
                      {/* Detailed recommendations - always visible */}
                      <div className={`p-3 rounded border-l-4 ${
                        level === 'high' ? 'border-green-500 bg-green-50' :
                        level === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                        'border-red-500 bg-red-50'
                      }`}>
                        <div className="font-medium text-slate-900 text-xs sm:text-base mb-1">Recommendation:</div>
                        <div className="text-slate-700 text-xs sm:text-base leading-relaxed mb-2">{config.recommendations[level].text}</div>
                        <div className="font-medium text-slate-900 text-xs sm:text-base mb-1">Examples:</div>
                        <div className="text-slate-600 text-xs sm:text-base leading-relaxed italic">{config.recommendations[level].examples}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Business Development Section */}
          <BusinessDevelopment assessment={assessment} />

          {/* Email CTA Section - Enhanced for Progressive Disclosure */}
          <div className="mb-8">
            <Card className="border-2 border-[#cd0000]/20 bg-gradient-to-r from-slate-50 to-white">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[#cd0000] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Receive Your Report
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Enter your business email to download your comprehensive AI readiness assessment report.
                  </p>
                </div>
                
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">Business Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@company.com"
                      className="h-12 px-4 rounded-xl border-2 border-slate-200 focus:border-[#cd0000] focus:ring-2 focus:ring-[#cd0000]/20 transition-all duration-200 text-base"
                    />
                  </div>
                  
                  {/* Contact Consent Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox 
                      id="contactConsent"
                      checked={contactConsent}
                      onCheckedChange={(checked) => setContactConsent(checked as boolean)}
                      className="mt-0.5 data-[state=checked]:bg-[#cd0000] data-[state=checked]:border-[#cd0000]"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor="contactConsent" 
                        className="text-sm text-slate-700 leading-relaxed cursor-pointer"
                      >
                        Yes, I would like Red Pill Labs to contact me about AI consulting services and solutions that could benefit my organization.
                      </Label>
                    </div>
                  </div>
                  
                  {showFullInsights ? (
                    <Button
                      onClick={handleDownloadPDF}
                      className="w-full h-12 bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Report
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        emailRequest.mutate({ assessmentId: assessment.id, email, contactConsent });
                      }}
                      disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || emailRequest.isPending}
                      className="w-full h-12 bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      {emailRequest.isPending ? "Submitting..." : "Submit Email"}
                    </Button>
                  )}
                  
                  {/* Privacy Disclaimer */}
                  <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm">Privacy Disclaimer</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      At Red Pill Labs, we respect your privacy. We will never sell, rent, or share your contact information with any third party without your consent. If you have any questions about how your information is used or protected, please contact us at 1-866-PILL-RED (745-5733).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-in animate-slide-up">
        {showRetakeButton && onRetakeAssessment && (
          <Button variant="ghost" onClick={onRetakeAssessment} className="hover-lift button-press w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Assessment
          </Button>
        )}
      </div>
      </div>
      
      {/* Exit Intent Popup - Disabled
      <Dialog open={showExitIntent} onOpenChange={setShowExitIntent}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-slate-900 mb-2">
              Wait! Don't Miss Your Complete Analysis
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 h-6 w-6 p-0"
              onClick={() => setShowExitIntent(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-[#cd0000] rounded-full flex items-center justify-center mx-auto">
              <Mail className="h-8 w-8 text-white" />
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Get Your Complete AI Strategy Blueprint</h4>
              <p className="text-sm text-slate-600 mb-4">
                Don't leave without your personalized implementation roadmap and executive-ready recommendations worth $1,200+ in consulting value.
              </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg text-left">
              <h5 className="font-medium text-slate-900 mb-2">What you get immediately:</h5>
              <div className="space-y-1 text-sm text-slate-700">
                <div className="flex items-center">✓ Executive-ready strategic roadmap</div>
                <div className="flex items-center">✓ Budget & timeline planning framework</div>
                <div className="flex items-center">✓ Risk mitigation strategies</div>
                <div className="flex items-center">✓ Professional PDF report for stakeholders</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="exit-email" className="text-sm font-medium text-slate-700 mb-1 block">Business Email</Label>
                <Input
                  id="exit-email"
                  type="email"
                  value={exitEmail}
                  onChange={(e) => setExitEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="h-10"
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="exit-contact-consent"
                  checked={exitContactConsent}
                  onCheckedChange={(checked) => setExitContactConsent(checked as boolean)}
                  className="data-[state=checked]:bg-[#cd0000] data-[state=checked]:border-[#cd0000] mt-0.5"
                />
                <Label 
                  htmlFor="exit-contact-consent" 
                  className="text-xs text-slate-600 leading-relaxed cursor-pointer"
                >
                  Yes, I'd like Red Pill Labs to contact me about AI consulting services.
                </Label>
              </div>
              
              <Button
                onClick={() => exitEmailRequest.mutate({ assessmentId: assessment.id, email: exitEmail, contactConsent: exitContactConsent })}
                disabled={!exitEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(exitEmail) || exitEmailRequest.isPending}
                className="w-full bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold"
              >
                {exitEmailRequest.isPending ? "Generating Blueprint..." : "Get My AI Strategy Blueprint (Free)"}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExitIntent(false)}
                className="w-full text-slate-500 hover:text-slate-700"
              >
                No thanks, I'll continue without the detailed analysis
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      */}
    </section>
  );
}

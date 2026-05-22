import React, { useState, useEffect } from "react";
import { CheckCircle, Download, RotateCcw, Target, AlertTriangle, Server, Database, Users, Network, DollarSign, Shield, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Assessment, DimensionScores } from "@/lib/types";
import ScoreChart from "@/components/charts/score-chart";
import RadarChart from "@/components/charts/radar-chart";
import BusinessDevelopment from "@/components/enhanced/business-development";
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

  const handleEmailSubmit = () => {
    setShowFullInsights(true);
    toast({
      title: "Email submitted successfully!",
      description: "You can now download your report.",
    });
  };


  const { overallScore, scores, organizationName, contactEmail, industry } = assessment;
  const dimensionRecommendations = getDimensionRecommendations(industry);
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
    const tiebreakerOrder: Record<string, number> = {
      dataQuality: 0,
      dataSecurity: 1,
      technologyInfrastructure: 2,
      systemIntegration: 3,
      teamLiteracy: 4,
      budget: 5,
    };

    // Get all dimensions with their scores and sort by lowest score first,
    // using fixed tiebreaker order when scores are equal
    const allDimensions = Object.entries(typedScores)
      .map(([dimension, score]) => ({
        dimension: dimension as keyof typeof dimensionConfig,
        score: score as number,
        config: dimensionConfig[dimension as keyof typeof dimensionConfig]
      }))
      .sort((a, b) => {
        if (a.score !== b.score) return a.score - b.score;
        return (tiebreakerOrder[a.dimension] ?? 99) - (tiebreakerOrder[b.dimension] ?? 99);
      });

    // Take the top 3 lowest scoring dimensions
    const top3Lowest = allDimensions.slice(0, 3);

    // Determine industry cluster for tailored recommendations
    const dataHeavyIndustries = ['Healthcare', 'Finance', 'Government'];
    const customerFacingIndustries = ['Retail & B2C Sales', 'Media', 'B2B Sales & Distribution'];
    const operationsHeavyIndustries = ['Manufacturing', 'Construction', 'Transportation', 'Energy', 'Agriculture'];
    const industryCluster: 'dataHeavy' | 'customerFacing' | 'operationsHeavy' | 'knowledge' =
      dataHeavyIndustries.includes(industry) ? 'dataHeavy' :
      customerFacingIndustries.includes(industry) ? 'customerFacing' :
      operationsHeavyIndustries.includes(industry) ? 'operationsHeavy' :
      'knowledge';

    const clusterActionItems = {
      dataHeavy: {
        technologyInfrastructure: {
          high: "Upgrade to compliance-ready cloud infrastructure and implement GPU computing for large-scale data processing and clinical or regulatory workloads",
          medium: "Audit current infrastructure for compliance gaps and plan scalable AI computing resources that meet industry data residency requirements",
          low: "Establish foundational cloud infrastructure with compliance controls and AI-ready capabilities suited to regulated data environments"
        },
        dataQuality: {
          high: "Implement advanced data governance policies, automated quality monitoring, and audit trails suited to regulatory reporting and compliance requirements",
          medium: "Create a data quality framework with formal data access protocols that account for patient, citizen, or financial data sensitivity",
          low: "Start with a basic data inventory across regulated data sources and implement data cleansing processes that preserve compliance requirements"
        },
        teamLiteracy: {
          high: "Develop an AI leadership program focused on responsible AI use in regulated environments and establish centers of excellence around compliance-aware AI applications",
          medium: "Launch a comprehensive AI training program covering AI tools relevant to clinical, financial, or public sector workflows and their compliance implications",
          low: "Begin with AI fundamentals training tailored to regulated industries and prioritize hiring personnel with experience in compliant AI deployment"
        },
        systemIntegration: {
          high: "Design a sophisticated AI integration architecture that connects clinical, financial, or government systems while maintaining data segregation and audit requirements",
          medium: "Evaluate current system APIs and plan an integration roadmap that accounts for legacy health, financial, or government platforms and their interoperability constraints",
          low: "Modernize legacy systems and establish an API-first architecture that enables compliant data exchange between regulated systems"
        },
        budget: {
          high: "Allocate a dedicated AI transformation budget with multi-year planning that accounts for compliance infrastructure, audit tooling, and specialized talent in regulated domains",
          medium: "Secure additional budget for AI infrastructure and training, with specific allocation for compliance validation and risk management capabilities",
          low: "Develop a business case for AI investment that emphasizes risk reduction and efficiency gains in regulated workflows, and seek approval for initial funding"
        },
        dataSecurity: {
          high: "Enhance AI-specific security controls with advanced privacy-preserving techniques suited to sensitive patient, financial, or citizen data",
          medium: "Strengthen cybersecurity framework and implement privacy compliance with data anonymization protocols aligned to your industry's regulatory requirements",
          low: "Establish foundational security controls and privacy compliance capabilities specific to your regulatory environment before any AI data processing begins"
        }
      },
      customerFacing: {
        technologyInfrastructure: {
          high: "Upgrade to AI-optimized cloud instances capable of handling real-time customer data, high transaction volumes, and personalization at scale",
          medium: "Audit current infrastructure and plan scalable AI computing resources that can support customer-facing applications and peak demand periods",
          low: "Establish foundational cloud infrastructure with AI-ready capabilities, prioritizing uptime and scalability for customer-facing systems"
        },
        dataQuality: {
          high: "Implement advanced data governance and automated quality monitoring across customer touchpoints, transaction systems, and behavioral data sources",
          medium: "Create a data quality framework and establish access protocols that consolidate customer data across channels into a unified view",
          low: "Start with a basic inventory of customer data sources and implement cleansing processes to remove duplicates and inconsistencies"
        },
        teamLiteracy: {
          high: "Develop an AI leadership program focused on customer experience applications and establish centers of excellence around personalization, demand forecasting, and campaign optimization",
          medium: "Launch a comprehensive AI training program for marketing, sales, and operations staff covering customer-facing AI tools and use cases",
          low: "Begin with AI fundamentals training focused on customer-facing applications and hire AI-experienced personnel familiar with retail or media environments"
        },
        systemIntegration: {
          high: "Design a sophisticated AI integration architecture connecting e-commerce, CRM, POS, and marketing platforms for unified customer intelligence and automation",
          medium: "Evaluate current system APIs and plan an integration roadmap that connects customer data across sales, service, and marketing platforms",
          low: "Modernize legacy systems and establish an API-first architecture that enables customer data to flow across channels without manual intervention"
        },
        budget: {
          high: "Allocate a dedicated AI transformation budget with multi-year planning focused on customer experience, personalization infrastructure, and revenue-generating AI applications",
          medium: "Secure additional budget for AI infrastructure and training, prioritizing tools that directly impact customer acquisition, retention, and lifetime value",
          low: "Develop a business case for AI investment that highlights competitive differentiation and customer experience ROI, and seek approval for initial funding"
        },
        dataSecurity: {
          high: "Enhance AI-specific security controls with advanced privacy-preserving techniques for customer behavioral data, purchase history, and personally identifiable information",
          medium: "Strengthen cybersecurity framework and implement privacy compliance with data anonymization for customer data, including consent management and breach notification protocols",
          low: "Establish foundational security controls and privacy compliance capabilities covering customer data collection, storage, and usage before AI implementation"
        }
      },
      operationsHeavy: {
        technologyInfrastructure: {
          high: "Upgrade to AI-optimized infrastructure with edge computing capabilities to support real-time operational data from field equipment, sensors, and logistics systems",
          medium: "Audit current infrastructure and plan AI computing resources that can integrate with operational technology (OT) and field data sources",
          low: "Establish foundational cloud infrastructure with AI-ready capabilities and basic connectivity to operational systems and equipment"
        },
        dataQuality: {
          high: "Implement advanced data governance and automated quality monitoring across operational data streams including equipment sensors, logistics feeds, and production records",
          medium: "Create a data quality framework and establish access protocols for operational data sources, including IoT and field-generated data",
          low: "Start with a basic inventory of operational data sources and implement cleansing processes for high-volume, inconsistently formatted field data"
        },
        teamLiteracy: {
          high: "Develop an AI leadership program for operations and engineering teams, and establish centers of excellence around predictive maintenance, supply chain optimization, and process automation",
          medium: "Launch a comprehensive AI training program for operations managers and field staff covering AI tools relevant to production, logistics, and asset management",
          low: "Begin with AI fundamentals training for operations and field teams, focusing on practical tools for process monitoring, scheduling, and reporting"
        },
        systemIntegration: {
          high: "Design a sophisticated AI integration architecture connecting ERP, supply chain, equipment monitoring, and field systems for end-to-end operational visibility",
          medium: "Evaluate current system APIs and plan an integration roadmap that bridges operational technology (OT) with information technology (IT) systems",
          low: "Modernize legacy operational systems and establish an API-first architecture that enables data flow between field equipment, planning tools, and reporting systems"
        },
        budget: {
          high: "Allocate a dedicated AI transformation budget with multi-year planning focused on operational efficiency, predictive maintenance, and supply chain optimization",
          medium: "Secure additional budget for AI infrastructure and training, with priority on tools that reduce downtime, waste, and operational costs",
          low: "Develop a business case for AI investment centered on measurable operational savings and seek approval for pilot funding in a single operational area"
        },
        dataSecurity: {
          high: "Enhance AI-specific security controls for operational technology environments, including protections for equipment data, supply chain information, and proprietary process data",
          medium: "Strengthen cybersecurity framework across IT and OT environments and implement data protection controls for sensitive operational and vendor data",
          low: "Establish foundational security controls covering operational systems and field data sources, with clear protocols for what data can be used in AI models"
        }
      },
      knowledge: {
        technologyInfrastructure: {
          high: "Upgrade to AI-optimized cloud instances and implement GPU computing for knowledge management, document processing, and analytical workloads",
          medium: "Audit current infrastructure and plan scalable AI computing resources aligned to knowledge work and collaboration needs",
          low: "Establish foundational cloud infrastructure with AI-ready capabilities suitable for document-heavy and research-oriented workflows"
        },
        dataQuality: {
          high: "Implement advanced data governance policies and automated quality monitoring across internal knowledge bases, client records, and project data",
          medium: "Create a data quality framework and establish data access protocols for unstructured and document-heavy data sources",
          low: "Start with a basic data inventory and implement cleansing processes for unstructured content and legacy document repositories"
        },
        teamLiteracy: {
          high: "Develop an AI leadership program for senior practitioners and establish centers of excellence around knowledge management, research acceleration, and AI-assisted delivery",
          medium: "Launch a comprehensive AI training program for consultants, educators, or program staff covering AI tools for knowledge work and client or stakeholder delivery",
          low: "Begin with AI fundamentals training and hire AI-experienced personnel who can apply AI to research, content, and advisory workflows"
        },
        systemIntegration: {
          high: "Design a sophisticated AI integration architecture connecting knowledge management, project delivery, CRM, and research platforms for intelligent workflow automation",
          medium: "Evaluate current system APIs and plan an integration roadmap that connects client management, document, and collaboration platforms",
          low: "Modernize legacy systems and establish an API-first architecture that enables knowledge and project data to flow across tools and teams"
        },
        budget: {
          high: "Allocate a dedicated AI transformation budget with multi-year planning focused on knowledge worker productivity, delivery quality, and competitive differentiation",
          medium: "Secure additional budget for AI infrastructure and training, prioritizing tools that accelerate research, content production, and client or stakeholder delivery",
          low: "Develop a business case for AI investment that quantifies time savings and quality improvements in core knowledge work, and seek approval for initial funding"
        },
        dataSecurity: {
          high: "Enhance AI-specific security controls and advanced privacy-preserving techniques for confidential client data, proprietary research, and sensitive organizational knowledge",
          medium: "Strengthen cybersecurity framework and implement privacy compliance with data anonymization for client records and internal knowledge assets",
          low: "Establish foundational security controls and privacy compliance capabilities covering client confidentiality and data handling obligations before AI implementation"
        }
      }
    };

    const actionItems = clusterActionItems[industryCluster];

    return top3Lowest.map((item, index) => {
      const level = getScoreLevel(item.score);
      const urgency = index === 0 ? "Critical" : index === 1 ? "High" : "Medium";

      const clusterDimensionExplanations: Record<string, Record<string, string>> = {
        dataHeavy: {
          technologyInfrastructure: "Your lowest score in Technology Infrastructure undermines your ability to handle sensitive regulated data at scale. Legacy systems will constrain AI initiatives and create compliance risks.",
          dataQuality: "Your lowest score in Data Quality & Access is critical for regulated industries. Poor data governance blocks AI accuracy and creates audit and compliance exposure.",
          teamLiteracy: "Your lowest score in Team AI Literacy is critical in regulated environments. Without staff trained in compliant AI practices, implementation will stall or create risk.",
          systemIntegration: "Your lowest score in System Integration will prevent you from connecting disparate regulated systems safely. This blocks the unified data view required for AI.",
          budget: "Your lowest score in Budget & Resources reflects insufficient investment in AI infrastructure and compliance capabilities. Without dedicated funding, transformation stalls.",
          dataSecurity: "Your lowest score in Data Security & Privacy is the highest risk area. Regulatory penalties and patient or customer trust losses will follow any breach tied to AI."
        },
        customerFacing: {
          technologyInfrastructure: "Your lowest score in Technology Infrastructure will limit your ability to deliver real-time, personalized customer experiences. Legacy systems can't handle the scale or speed AI requires.",
          dataQuality: "Your lowest score in Data Quality & Access prevents unified customer understanding. Without consolidated, clean customer data, personalization and targeting fail.",
          teamLiteracy: "Your lowest score in Team AI Literacy means your team can't effectively use AI to drive customer engagement and revenue. Skills gaps will undermine any tool investment.",
          systemIntegration: "Your lowest score in System Integration blocks the connected customer view across sales, marketing, and service. This prevents coordinated, AI-driven customer experiences.",
          budget: "Your lowest score in Budget & Resources reflects underinvestment in customer experience AI. Competitors with better AI funding will outpace you on acquisition and retention.",
          dataSecurity: "Your lowest score in Data Security & Privacy puts customer trust and compliance at risk. Data breaches tied to AI will damage brand reputation and customer relationships."
        },
        operationsHeavy: {
          technologyInfrastructure: "Your lowest score in Technology Infrastructure limits your ability to collect and process real-time operational data. Field equipment and sensors can't feed AI systems effectively.",
          dataQuality: "Your lowest score in Data Quality & Access prevents unified visibility across operations. Siloed, inconsistent field and equipment data blocks predictive maintenance and optimization.",
          teamLiteracy: "Your lowest score in Team AI Literacy means operations managers and field staff can't use AI tools effectively. Adoption will be slow without proper training and support.",
          systemIntegration: "Your lowest score in System Integration prevents you from connecting ERP, supply chain, and field systems. This blocks end-to-end operational visibility and automation.",
          budget: "Your lowest score in Budget & Resources reflects underinvestment in operational AI. Competitors with better AI capabilities will outpace you on efficiency and cost.",
          dataSecurity: "Your lowest score in Data Security & Privacy puts proprietary operational processes and supply chain data at risk. Breaches can disrupt operations and expose competitive advantages."
        },
        knowledge: {
          technologyInfrastructure: "Your lowest score in Technology Infrastructure limits your ability to process large volumes of documents, research, and client data. This constrains knowledge work acceleration through AI.",
          dataQuality: "Your lowest score in Data Quality & Access prevents unified access to client records, research, and internal knowledge. Fragmented data sources limit AI effectiveness.",
          teamLiteracy: "Your lowest score in Team AI Literacy means your knowledge workers can't leverage AI to accelerate research, delivery, or client work. Skills gaps will limit competitive advantage.",
          systemIntegration: "Your lowest score in System Integration prevents knowledge management, CRM, and project systems from sharing data. This blocks AI-powered workflow automation and insights.",
          budget: "Your lowest score in Budget & Resources reflects underinvestment in knowledge worker productivity tools. Competitors with better AI funding will deliver faster, higher-quality work.",
          dataSecurity: "Your lowest score in Data Security & Privacy puts confidential client data, proprietary research, and organizational knowledge at risk. Breaches erode client trust and competitive standing."
        }
      };

      const explanation = clusterDimensionExplanations[industryCluster]?.[item.dimension]
        ?? (urgency === "Critical"
          ? "This dimension has your lowest score and will block progress in other areas if not addressed first."
          : urgency === "High"
          ? "Addressing this second will accelerate the impact of your top priority fix."
          : "This is important but can be tackled once your top two priorities are underway.");

      return {
        title: item.config.label,
        action: actionItems[item.dimension][level],
        urgency,
        explanation,
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
                const baseConfig = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const config = { ...baseConfig, recommendations: (dimensionRecommendations as any)[dimension] ?? baseConfig.recommendations };
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
                    const baseConfig = dimensionConfig[dimension as keyof typeof dimensionConfig];
                    const config = { ...baseConfig, recommendations: (dimensionRecommendations as any)[dimension] ?? baseConfig.recommendations };
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
                        <p className="text-slate-500 text-xs sm:text-sm mt-1 italic">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                const baseConfig = dimensionConfig[dimension as keyof typeof dimensionConfig];
                const config = { ...baseConfig, recommendations: (dimensionRecommendations as any)[dimension] ?? baseConfig.recommendations };
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
                    Get a formatted PDF of your results — ready to share with your team or leadership.
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
                        handleEmailSubmit();
                      }}
                      disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
                      className="w-full h-12 bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Submit Email
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
                onClick={() => { setShowExitIntent(false); setEmail(exitEmail); setContactConsent(exitContactConsent); setShowFullInsights(true); }}
                disabled={!exitEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(exitEmail)}
                className="w-full bg-[#cd0000] hover:bg-[#b30000] text-white font-semibold"
              >
                Get My AI Strategy Blueprint (Free)
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

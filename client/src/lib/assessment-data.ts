export interface Question {
  id: string;
  dimension: string;
  dimensionLabel: string;
  icon: string;
  question: string;
  options: {
    value: number;
    text: string;
    description: string;
  }[];
}

export const questions: Question[] = [
  // Technology Infrastructure Questions
  {
    id: "technologyInfrastructure_1",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How would you describe your organization's current technology stack?",
    options: [
      {
        value: 1,
        text: "Mostly legacy systems",
        description: "Older technology systems that may limit future growth"
      },
      {
        value: 2,
        text: "Some modern systems",
        description: "Mix of older and newer systems with basic flexibility"
      },
      {
        value: 3,
        text: "Mostly modern systems",
        description: "Good technology foundation with ability to handle growth"
      },
      {
        value: 4,
        text: "Advanced modern systems",
        description: "Strong technology setup with high performance capabilities"
      },
      {
        value: 5,
        text: "Cutting-edge technology platform",
        description: "State-of-the-art systems optimized for innovation and scalability"
      }
    ]
  },
  {
    id: "technologyInfrastructure_2",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How well can your organization handle large amounts of business data?",
    options: [
      {
        value: 1,
        text: "Struggles with large data volumes",
        description: "Current systems have difficulty handling substantial business data"
      },
      {
        value: 2,
        text: "Handles current business needs",
        description: "Adequate for daily operations but limited for expansion"
      },
      {
        value: 3,
        text: "Good capacity with room for growth",
        description: "Can handle moderate increases in business data and processing"
      },
      {
        value: 4,
        text: "High capacity for business growth",
        description: "Significant capacity for data growth and business expansion"
      },
      {
        value: 5,
        text: "Enterprise-scale data capabilities",
        description: "Extensive capacity to handle massive business data volumes"
      }
    ]
  },
  {
    id: "technologyInfrastructure_3",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How easily can your systems connect and share data with new business tools?",
    options: [
      {
        value: 1,
        text: "Very difficult to connect new tools",
        description: "Systems operate independently with minimal connection options"
      },
      {
        value: 2,
        text: "Basic connection capabilities",
        description: "Some ability to connect tools but with limited functionality"
      },
      {
        value: 3,
        text: "Good connection options",
        description: "Solid ability to integrate most business applications"
      },
      {
        value: 4,
        text: "Excellent integration capabilities",
        description: "Strong ability to connect and manage multiple business tools"
      },
      {
        value: 5,
        text: "Seamless integration platform",
        description: "Advanced capability to easily connect any business application"
      }
    ]
  },
  {
    id: "technologyInfrastructure_4",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How well can your organization monitor and track system performance?",
    options: [
      {
        value: 1,
        text: "Basic or no monitoring",
        description: "Limited visibility into system performance"
      },
      {
        value: 2,
        text: "Standard monitoring tools",
        description: "Basic metrics and alerting in place"
      },
      {
        value: 3,
        text: "Good monitoring coverage",
        description: "Comprehensive monitoring across most systems"
      },
      {
        value: 4,
        text: "Advanced performance tracking",
        description: "Comprehensive monitoring with detailed business insights"
      },
      {
        value: 5,
        text: "AI-powered monitoring",
        description: "Intelligent monitoring with predictive capabilities"
      }
    ]
  },
  {
    id: "technologyInfrastructure_5",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How would you rate your organization's internet and network connectivity?",
    options: [
      {
        value: 1,
        text: "Limited network capacity",
        description: "Frequent bottlenecks and connectivity issues"
      },
      {
        value: 2,
        text: "Adequate internet connectivity",
        description: "Meets current needs but limited capacity for growth"
      },
      {
        value: 3,
        text: "Good network performance",
        description: "Reliable connectivity with good bandwidth"
      },
      {
        value: 4,
        text: "High-performance network",
        description: "Excellent bandwidth and low latency"
      },
      {
        value: 5,
        text: "Enterprise-level connectivity",
        description: "Extremely fast, reliable internet with backup systems"
      }
    ]
  },

  // Data Quality & Access Questions
  {
    id: "dataQuality_1",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "How would you describe the quality of your organization's data?",
    options: [
      {
        value: 1,
        text: "Poor data quality",
        description: "Significant issues with accuracy and completeness"
      },
      {
        value: 2,
        text: "Inconsistent data quality",
        description: "Some data is good, but quality varies significantly"
      },
      {
        value: 3,
        text: "Acceptable data quality",
        description: "Generally reliable with some quality issues"
      },
      {
        value: 4,
        text: "Good data quality",
        description: "High quality data with established standards"
      },
      {
        value: 5,
        text: "Excellent data quality",
        description: "Consistently high-quality data with robust governance"
      }
    ]
  },
  {
    id: "dataQuality_2",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "How accessible is your data for analysis and AI projects?",
    options: [
      {
        value: 1,
        text: "Very difficult to access",
        description: "Data is siloed and hard to obtain"
      },
      {
        value: 2,
        text: "Limited access",
        description: "Some data available but with restrictions"
      },
      {
        value: 3,
        text: "Moderate accessibility",
        description: "Data is available with some effort required"
      },
      {
        value: 4,
        text: "Good data accessibility",
        description: "Most data is easily accessible to authorized users"
      },
      {
        value: 5,
        text: "Excellent data accessibility",
        description: "Self-service data access with proper governance"
      }
    ]
  },
  {
    id: "dataQuality_3",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "What is the state of your data governance framework?",
    options: [
      {
        value: 1,
        text: "No formal data governance",
        description: "Ad-hoc data management without clear policies"
      },
      {
        value: 2,
        text: "Basic data governance",
        description: "Some policies exist but not consistently enforced"
      },
      {
        value: 3,
        text: "Developing governance framework",
        description: "Governance structure is being established"
      },
      {
        value: 4,
        text: "Mature data governance",
        description: "Well-established policies and procedures"
      },
      {
        value: 5,
        text: "Advanced data governance",
        description: "Comprehensive governance with automated compliance"
      }
    ]
  },
  {
    id: "dataQuality_4",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "How well is your data documented and cataloged?",
    options: [
      {
        value: 1,
        text: "Minimal documentation",
        description: "Little to no data documentation available"
      },
      {
        value: 2,
        text: "Basic documentation",
        description: "Some documentation exists but is incomplete"
      },
      {
        value: 3,
        text: "Adequate documentation",
        description: "Most data sources are documented"
      },
      {
        value: 4,
        text: "Comprehensive documentation",
        description: "Well-documented with metadata and lineage"
      },
      {
        value: 5,
        text: "Automated data catalog",
        description: "Dynamic documentation with discovery capabilities"
      }
    ]
  },
  {
    id: "dataQuality_5",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "How ready is your data for automated business insights and decision-making?",
    options: [
      {
        value: 1,
        text: "Not prepared for automation",
        description: "Significant organization and cleanup needed"
      },
      {
        value: 2,
        text: "Requires substantial preparation",
        description: "Data exists but needs significant work for automation"
      },
      {
        value: 3,
        text: "Moderately prepared",
        description: "Some data is automation-ready with preparation needed"
      },
      {
        value: 4,
        text: "Well-prepared for automation",
        description: "Most data is organized and analysis-ready"
      },
      {
        value: 5,
        text: "Business-ready data",
        description: "Data is specifically organized and ready for automated insights"
      }
    ]
  },

  // Team AI Literacy Questions
  {
    id: "teamLiteracy_1",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "What is the general level of AI knowledge within your organization?",
    options: [
      {
        value: 1,
        text: "Very limited AI knowledge",
        description: "Little to no understanding of AI concepts"
      },
      {
        value: 2,
        text: "Basic AI awareness",
        description: "General awareness but limited practical knowledge"
      },
      {
        value: 3,
        text: "Moderate AI understanding",
        description: "Good conceptual understanding with some practical experience"
      },
      {
        value: 4,
        text: "Strong AI knowledge",
        description: "Deep understanding with practical implementation experience"
      },
      {
        value: 5,
        text: "Expert-level AI expertise",
        description: "Advanced AI practitioners and thought leaders"
      }
    ]
  },
  {
    id: "teamLiteracy_2",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "How many team members have hands-on experience with automation and data analysis tools?",
    options: [
      {
        value: 1,
        text: "No team members",
        description: "No one has practical automation and data analysis experience"
      },
      {
        value: 2,
        text: "1-2 team members",
        description: "Very limited hands-on experience"
      },
      {
        value: 3,
        text: "Small group (3-5)",
        description: "Some team members have practical experience"
      },
      {
        value: 4,
        text: "Significant portion (25%+)",
        description: "Good number of experienced practitioners"
      },
      {
        value: 5,
        text: "Most of the team",
        description: "Majority have hands-on automation and data analysis experience"
      }
    ]
  },
  {
    id: "teamLiteracy_3",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "How enthusiastic is your team about adopting AI technologies?",
    options: [
      {
        value: 1,
        text: "Resistant to AI adoption",
        description: "Team is skeptical or opposed to AI implementation"
      },
      {
        value: 2,
        text: "Cautiously interested",
        description: "Some interest but with significant reservations"
      },
      {
        value: 3,
        text: "Moderately enthusiastic",
        description: "Generally positive but with some concerns"
      },
      {
        value: 4,
        text: "Very enthusiastic",
        description: "High interest and eagerness to adopt AI"
      },
      {
        value: 5,
        text: "Extremely enthusiastic",
        description: "Team is actively pushing for AI adoption"
      }
    ]
  },
  {
    id: "teamLiteracy_4",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "What is your organization's approach to AI training and education?",
    options: [
      {
        value: 1,
        text: "No formal AI training",
        description: "No structured learning programs in place"
      },
      {
        value: 2,
        text: "Ad-hoc learning",
        description: "Individual learning without organizational support"
      },
      {
        value: 3,
        text: "Some training initiatives",
        description: "Basic training programs or resources available"
      },
      {
        value: 4,
        text: "Comprehensive training program",
        description: "Well-structured AI education initiatives"
      },
      {
        value: 5,
        text: "Advanced learning culture",
        description: "Continuous learning with expert mentorship"
      }
    ]
  },
  {
    id: "teamLiteracy_5",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "How well does your team understand data analysis and business insights?",
    options: [
      {
        value: 1,
        text: "Very limited understanding",
        description: "Little experience with data analysis"
      },
      {
        value: 2,
        text: "Basic data skills",
        description: "Some experience with spreadsheets and basic analysis"
      },
      {
        value: 3,
        text: "Moderate analytics capability",
        description: "Good understanding of data analysis concepts"
      },
      {
        value: 4,
        text: "Strong data analysis skills",
        description: "Advanced insights and statistical understanding"
      },
      {
        value: 5,
        text: "Expert data analysts",
        description: "Deep expertise in data analysis and advanced business insights"
      }
    ]
  },

  // System Integration Questions
  {
    id: "systemIntegration_1",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "How well integrated are your current software systems?",
    options: [
      {
        value: 1,
        text: "Highly siloed systems",
        description: "Systems operate independently with minimal integration"
      },
      {
        value: 2,
        text: "Limited integration",
        description: "Some connections exist but integration is basic"
      },
      {
        value: 3,
        text: "Moderate integration",
        description: "Good connectivity between key systems"
      },
      {
        value: 4,
        text: "Well-integrated ecosystem",
        description: "Strong integration across most systems"
      },
      {
        value: 5,
        text: "Fully integrated platform",
        description: "Seamless integration with unified data flow"
      }
    ]
  },
  {
    id: "systemIntegration_2",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "How much does your organization rely on manual processes (like Excel or spreadsheet tools) to move data between different business systems?",
    options: [
      {
        value: 1,
        text: "Heavily rely on manual processes",
        description: "Most data movement is done through Excel files, email attachments, or manual entry"
      },
      {
        value: 2,
        text: "Often use manual processes",
        description: "Frequent use of spreadsheets and manual transfers with some basic automation"
      },
      {
        value: 3,
        text: "Mix of manual and automated processes",
        description: "Balance between automated data flows and manual Excel-based transfers"
      },
      {
        value: 4,
        text: "Minimal manual processes",
        description: "Mostly automated data integration with occasional spreadsheet work"
      },
      {
        value: 5,
        text: "Fully automated data movement",
        description: "Seamless automated data flow between systems with no manual transfers needed"
      }
    ]
  },
  {
    id: "systemIntegration_3",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "What is your experience with implementing new technology solutions?",
    options: [
      {
        value: 1,
        text: "Very limited experience",
        description: "Rarely implement new technology solutions"
      },
      {
        value: 2,
        text: "Basic implementation capability",
        description: "Some experience but often challenging"
      },
      {
        value: 3,
        text: "Moderate implementation skills",
        description: "Generally successful with new technology adoption"
      },
      {
        value: 4,
        text: "Strong implementation track record",
        description: "Consistently successful with technology integration"
      },
      {
        value: 5,
        text: "Expert implementation capability",
        description: "Highly skilled at rapid technology adoption"
      }
    ]
  },
  {
    id: "systemIntegration_4",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "How flexible is your current IT architecture?",
    options: [
      {
        value: 1,
        text: "Rigid, inflexible architecture",
        description: "Very difficult to make changes or additions"
      },
      {
        value: 2,
        text: "Limited flexibility",
        description: "Changes are possible but require significant effort"
      },
      {
        value: 3,
        text: "Moderately flexible",
        description: "Can adapt to new requirements with reasonable effort"
      },
      {
        value: 4,
        text: "Highly flexible architecture",
        description: "Easy to modify and extend systems"
      },
      {
        value: 5,
        text: "Fully modular and adaptable",
        description: "Architecture designed for rapid change and integration"
      }
    ]
  },
  {
    id: "systemIntegration_5",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "How well do your systems handle real-time data processing?",
    options: [
      {
        value: 1,
        text: "Batch processing only",
        description: "Systems only handle scheduled, batch operations"
      },
      {
        value: 2,
        text: "Limited real-time capability",
        description: "Some real-time processing but very basic"
      },
      {
        value: 3,
        text: "Moderate real-time processing",
        description: "Good real-time capabilities for most use cases"
      },
      {
        value: 4,
        text: "Strong real-time processing systems",
        description: "Excellent real-time data processing capabilities"
      },
      {
        value: 5,
        text: "Advanced streaming platform",
        description: "Enterprise-grade real-time data streaming"
      }
    ]
  },

  // Budget & Resources Questions
  {
    id: "budget_1",
    dimension: "budget",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "What budget has been allocated for AI initiatives?",
    options: [
      {
        value: 1,
        text: "No dedicated AI budget",
        description: "No specific funding allocated for AI projects"
      },
      {
        value: 2,
        text: "Limited budget allocation",
        description: "Small budget for exploring AI opportunities"
      },
      {
        value: 3,
        text: "Moderate budget for AI",
        description: "Reasonable budget for pilot projects and basic implementation"
      },
      {
        value: 4,
        text: "Substantial AI investment",
        description: "Significant budget allocated for comprehensive AI adoption"
      },
      {
        value: 5,
        text: "Major AI investment commitment",
        description: "Large budget with multi-year AI transformation plan"
      }
    ]
  },
  {
    id: "budget_2",
    dimension: "budget",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "How willing is leadership to invest in AI training and education?",
    options: [
      {
        value: 1,
        text: "No training investment",
        description: "Leadership won't fund AI education initiatives"
      },
      {
        value: 2,
        text: "Minimal training budget",
        description: "Very limited resources for AI learning"
      },
      {
        value: 3,
        text: "Moderate training investment",
        description: "Reasonable budget for team development"
      },
      {
        value: 4,
        text: "Strong training commitment",
        description: "Significant investment in AI skill development"
      },
      {
        value: 5,
        text: "Comprehensive education program",
        description: "Major commitment to building AI expertise"
      }
    ]
  },
  {
    id: "budget_3",
    dimension: "budget",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "What resources are available for hiring AI talent?",
    options: [
      {
        value: 1,
        text: "No hiring budget for AI roles",
        description: "Cannot hire dedicated AI professionals"
      },
      {
        value: 2,
        text: "Limited ability to hire",
        description: "Could hire 1-2 AI-focused individuals"
      },
      {
        value: 3,
        text: "Moderate hiring capability",
        description: "Can build a small AI team"
      },
      {
        value: 4,
        text: "Strong hiring budget",
        description: "Can attract and hire quality AI talent"
      },
      {
        value: 5,
        text: "Competitive talent acquisition",
        description: "Can compete for top AI professionals"
      }
    ]
  },
  {
    id: "budget_4",
    dimension: "budget",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "How much can you invest in automation technology and tools?",
    options: [
      {
        value: 1,
        text: "Very limited technology budget",
        description: "Cannot invest in automation-specific technology"
      },
      {
        value: 2,
        text: "Basic technology investment",
        description: "Can afford basic automation tools and platforms"
      },
      {
        value: 3,
        text: "Moderate technology budget",
        description: "Good budget for standard automation technology"
      },
      {
        value: 4,
        text: "Substantial technology investment",
        description: "Can invest in advanced automation platforms and tools"
      },
      {
        value: 5,
        text: "Enterprise-level automation investment",
        description: "Budget for cutting-edge automation technology"
      }
    ]
  },
  {
    id: "budget_5",
    dimension: "budget",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "What is the expected ROI timeline for AI investments?",
    options: [
      {
        value: 1,
        text: "Immediate ROI expected",
        description: "Must show returns very quickly"
      },
      {
        value: 2,
        text: "Short-term ROI",
        description: "Expected returns within the near term"
      },
      {
        value: 3,
        text: "Medium-term ROI",
        description: "Reasonable timeline for automation returns"
      },
      {
        value: 4,
        text: "Long-term investment view",
        description: "Patient approach to automation investment returns"
      },
      {
        value: 5,
        text: "Strategic long-term commitment",
        description: "Multi-year investment strategy with patient capital"
      }
    ]
  },

  // Data Security & Privacy Questions
  {
    id: "dataSecurity_1",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How mature is your organization's cybersecurity framework?",
    options: [
      {
        value: 1,
        text: "Basic security measures",
        description: "Minimal security policies and controls"
      },
      {
        value: 2,
        text: "Standard security practices",
        description: "Basic security framework with some controls"
      },
      {
        value: 3,
        text: "Good security framework",
        description: "Well-established security policies and procedures"
      },
      {
        value: 4,
        text: "Advanced security systems",
        description: "Comprehensive security with advanced controls"
      },
      {
        value: 5,
        text: "Enterprise-grade security",
        description: "Leading security practices with continuous monitoring"
      }
    ]
  },
  {
    id: "dataSecurity_2",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How well does your organization understand global data privacy standards (e.g., GDPR, CCPA) and apply them to AI projects?",
    options: [
      {
        value: 1,
        text: "Limited understanding",
        description: "Minimal knowledge of global privacy regulations"
      },
      {
        value: 2,
        text: "Basic compliance awareness",
        description: "Some understanding but limited application to AI"
      },
      {
        value: 3,
        text: "Good regulatory knowledge",
        description: "Well-informed about privacy laws with basic AI application"
      },
      {
        value: 4,
        text: "Strong compliance program",
        description: "Comprehensive understanding with systematic AI application"
      },
      {
        value: 5,
        text: "Expert privacy governance",
        description: "Leading expertise in privacy regulations for AI projects"
      }
    ]
  },
  {
    id: "dataSecurity_3",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How robust are your data breach prevention and incident response procedures?",
    options: [
      {
        value: 1,
        text: "Limited incident response",
        description: "Minimal procedures for handling security incidents"
      },
      {
        value: 2,
        text: "Basic incident response plan",
        description: "Basic procedures with some response capabilities"
      },
      {
        value: 3,
        text: "Good incident response framework",
        description: "Well-defined procedures with regular testing"
      },
      {
        value: 4,
        text: "Advanced incident response program",
        description: "Comprehensive response with proactive threat detection"
      },
      {
        value: 5,
        text: "Leading incident response practices",
        description: "Industry-leading prevention and response capabilities"
      }
    ]
  },
  {
    id: "dataSecurity_4",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "What encryption and access control measures do you have in place?",
    options: [
      {
        value: 1,
        text: "Basic access controls",
        description: "Simple password protection with minimal encryption"
      },
      {
        value: 2,
        text: "Standard security controls",
        description: "Basic encryption and role-based access controls"
      },
      {
        value: 3,
        text: "Good security controls",
        description: "Strong encryption with comprehensive access management"
      },
      {
        value: 4,
        text: "Advanced security controls",
        description: "Multi-factor authentication with zero-trust principles"
      },
      {
        value: 5,
        text: "Enterprise-grade controls",
        description: "Industry-leading encryption and identity management"
      }
    ]
  },
  {
    id: "dataSecurity_5",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How is data anonymization handled in your organization to maintain user privacy in AI datasets?",
    options: [
      {
        value: 1,
        text: "No formal anonymization",
        description: "Limited or no data anonymization practices"
      },
      {
        value: 2,
        text: "Basic anonymization techniques",
        description: "Simple data masking or removal of identifiers"
      },
      {
        value: 3,
        text: "Standard anonymization methods",
        description: "Established practices for data de-identification"
      },
      {
        value: 4,
        text: "Advanced anonymization framework",
        description: "Sophisticated techniques including differential privacy"
      },
      {
        value: 5,
        text: "Leading anonymization practices",
        description: "State-of-the-art privacy-preserving AI methodologies"
      }
    ]
  }
];

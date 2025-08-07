export interface Question {
  id: string;
  dimension: string;
  dimensionLabel: string;
  icon: string;
  question: string;
  description: string;
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
    question: "How would you describe your organization's current cloud infrastructure?",
    description: "Consider your cloud adoption level, scalability, and computing resources available for AI workloads.",
    options: [
      {
        value: 1,
        text: "Minimal or no cloud infrastructure",
        description: "Primarily on-premises systems with limited scalability"
      },
      {
        value: 2,
        text: "Basic cloud adoption",
        description: "Some cloud services in use, but limited AI-ready infrastructure"
      },
      {
        value: 3,
        text: "Moderate cloud infrastructure",
        description: "Good cloud foundation with some scalable computing resources"
      },
      {
        value: 4,
        text: "Advanced cloud infrastructure",
        description: "Robust cloud setup with high-performance computing capabilities"
      },
      {
        value: 5,
        text: "Enterprise-grade AI-ready infrastructure",
        description: "Fully optimized cloud infrastructure with AI/ML specific resources"
      }
    ]
  },
  {
    id: "technologyInfrastructure_2",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "What is your current data storage and processing capacity?",
    description: "Evaluate your ability to handle large datasets and computational workloads.",
    options: [
      {
        value: 1,
        text: "Limited storage and processing power",
        description: "Struggles with current data volumes"
      },
      {
        value: 2,
        text: "Adequate for current needs",
        description: "Meets existing requirements but limited headroom"
      },
      {
        value: 3,
        text: "Good capacity with room for growth",
        description: "Can handle moderate increases in data and processing"
      },
      {
        value: 4,
        text: "High capacity infrastructure",
        description: "Significant headroom for data growth and processing"
      },
      {
        value: 5,
        text: "Enterprise-scale capacity",
        description: "Massive storage and processing capabilities"
      }
    ]
  },
  {
    id: "technologyInfrastructure_3",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How mature is your organization's API infrastructure?",
    description: "Consider your ability to integrate AI services and expose data through APIs.",
    options: [
      {
        value: 1,
        text: "No API infrastructure",
        description: "Limited or no API endpoints available"
      },
      {
        value: 2,
        text: "Basic APIs for internal use",
        description: "Some internal APIs but limited functionality"
      },
      {
        value: 3,
        text: "Well-developed API ecosystem",
        description: "Good API coverage for most systems"
      },
      {
        value: 4,
        text: "Comprehensive API strategy",
        description: "Extensive APIs with good documentation and management"
      },
      {
        value: 5,
        text: "Enterprise API platform",
        description: "Full API lifecycle management with security and monitoring"
      }
    ]
  },
  {
    id: "technologyInfrastructure_4",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "What is your organization's monitoring and observability capability?",
    description: "Assess your ability to monitor AI systems and detect issues.",
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
        text: "Advanced observability",
        description: "Full stack monitoring with analytics capabilities"
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
    question: "How would you rate your organization's network infrastructure?",
    description: "Consider bandwidth, latency, and reliability for AI workloads.",
    options: [
      {
        value: 1,
        text: "Limited network capacity",
        description: "Frequent bottlenecks and connectivity issues"
      },
      {
        value: 2,
        text: "Adequate network infrastructure",
        description: "Meets current needs but limited headroom"
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
        text: "Enterprise-grade network",
        description: "Ultra-high bandwidth with redundancy and optimization"
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
    description: "Consider data accuracy, completeness, consistency, and reliability.",
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
    description: "Evaluate how easily teams can access and work with organizational data.",
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
    description: "Consider data policies, ownership, and management processes.",
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
    description: "Assess the availability of data dictionaries, metadata, and documentation.",
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
    question: "How prepared is your data for machine learning and AI use cases?",
    description: "Consider data format, structure, and readiness for analysis.",
    options: [
      {
        value: 1,
        text: "Not prepared for AI",
        description: "Significant preprocessing and cleaning required"
      },
      {
        value: 2,
        text: "Requires substantial preparation",
        description: "Data exists but needs significant work for AI use"
      },
      {
        value: 3,
        text: "Moderately prepared",
        description: "Some data is AI-ready with preparation needed"
      },
      {
        value: 4,
        text: "Well-prepared for AI",
        description: "Most data is structured and analysis-ready"
      },
      {
        value: 5,
        text: "AI-optimized data",
        description: "Data is specifically prepared and optimized for AI/ML"
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
    description: "Assess the overall understanding of AI concepts and applications.",
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
    question: "How many team members have hands-on experience with AI/ML tools?",
    description: "Consider practical experience with AI platforms, frameworks, or tools.",
    options: [
      {
        value: 1,
        text: "No team members",
        description: "No one has practical AI/ML experience"
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
        description: "Majority have hands-on AI/ML experience"
      }
    ]
  },
  {
    id: "teamLiteracy_3",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "How enthusiastic is your team about adopting AI technologies?",
    description: "Gauge the team's attitude and willingness to embrace AI.",
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
    description: "Evaluate current and planned AI learning initiatives.",
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
    question: "How well does your team understand data science and analytics?",
    description: "Assess foundational skills in data analysis and statistical thinking.",
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
        text: "Strong data science skills",
        description: "Advanced analytics and statistical knowledge"
      },
      {
        value: 5,
        text: "Expert data practitioners",
        description: "Deep expertise in data science and advanced analytics"
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
    description: "Consider the connectivity and data flow between existing systems.",
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
    question: "How compatible are your systems with modern AI/ML platforms?",
    description: "Assess the technical compatibility for AI integration.",
    options: [
      {
        value: 1,
        text: "Legacy systems incompatible",
        description: "Current systems cannot integrate with AI platforms"
      },
      {
        value: 2,
        text: "Limited compatibility",
        description: "Some systems can integrate but with significant effort"
      },
      {
        value: 3,
        text: "Moderate compatibility",
        description: "Most systems can integrate with some modification"
      },
      {
        value: 4,
        text: "High compatibility",
        description: "Systems are well-suited for AI integration"
      },
      {
        value: 5,
        text: "AI-native architecture",
        description: "Systems are designed for seamless AI integration"
      }
    ]
  },
  {
    id: "systemIntegration_3",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "What is your experience with implementing new technology solutions?",
    description: "Consider your track record with technology adoption and integration.",
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
    description: "Evaluate the adaptability of your systems to new requirements.",
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
    description: "Assess capability for real-time AI applications and responses.",
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
        text: "Strong real-time infrastructure",
        description: "Excellent real-time processing capabilities"
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
    description: "Consider current and planned budget for AI technology and implementation.",
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
    description: "Assess commitment to developing internal AI capabilities.",
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
    description: "Consider budget and plans for bringing in AI expertise.",
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
    question: "How much can you invest in AI infrastructure and tools?",
    description: "Assess budget for AI platforms, software, and infrastructure.",
    options: [
      {
        value: 1,
        text: "Very limited infrastructure budget",
        description: "Cannot invest in AI-specific infrastructure"
      },
      {
        value: 2,
        text: "Basic infrastructure investment",
        description: "Can afford basic AI tools and platforms"
      },
      {
        value: 3,
        text: "Moderate infrastructure budget",
        description: "Good budget for standard AI infrastructure"
      },
      {
        value: 4,
        text: "Substantial infrastructure investment",
        description: "Can invest in advanced AI platforms and tools"
      },
      {
        value: 5,
        text: "Enterprise-grade AI investment",
        description: "Budget for cutting-edge AI infrastructure"
      }
    ]
  },
  {
    id: "budget_5",
    dimension: "budget",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "What is the expected ROI timeline for AI investments?",
    description: "Consider leadership expectations for return on AI investment.",
    options: [
      {
        value: 1,
        text: "Immediate ROI expected",
        description: "Must show returns within 3-6 months"
      },
      {
        value: 2,
        text: "Short-term ROI (6-12 months)",
        description: "Expected returns within one year"
      },
      {
        value: 3,
        text: "Medium-term ROI (1-2 years)",
        description: "Reasonable timeline for AI returns"
      },
      {
        value: 4,
        text: "Long-term investment view (2-3 years)",
        description: "Patient approach to AI investment returns"
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
    description: "Assess current security policies, procedures, and infrastructure.",
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
        text: "Advanced security infrastructure",
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
    question: "What is your approach to data privacy and protection?",
    description: "Consider privacy policies, data handling, and regulatory compliance.",
    options: [
      {
        value: 1,
        text: "Basic data privacy measures",
        description: "Minimal privacy controls and policies"
      },
      {
        value: 2,
        text: "Standard privacy practices",
        description: "Basic privacy framework with some protections"
      },
      {
        value: 3,
        text: "Good privacy controls",
        description: "Well-established privacy policies and procedures"
      },
      {
        value: 4,
        text: "Advanced privacy framework",
        description: "Comprehensive privacy controls and monitoring"
      },
      {
        value: 5,
        text: "Privacy-by-design approach",
        description: "Leading privacy practices with proactive controls"
      }
    ]
  },
  {
    id: "dataSecurity_3",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How well do you handle data protection regulatory compliance?",
    description: "Assess ability to meet GDPR, CCPA, and other data protection regulations.",
    options: [
      {
        value: 1,
        text: "Limited compliance capability",
        description: "Struggle to meet data protection requirements"
      },
      {
        value: 2,
        text: "Basic compliance measures",
        description: "Meet minimum data protection requirements"
      },
      {
        value: 3,
        text: "Good compliance framework",
        description: "Generally compliant with data protection regulations"
      },
      {
        value: 4,
        text: "Strong compliance program",
        description: "Comprehensive compliance with regular auditing"
      },
      {
        value: 5,
        text: "Leading compliance practices",
        description: "Exceed compliance requirements with proactive approach"
      }
    ]
  },
  {
    id: "dataSecurity_4",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "What encryption and access control measures do you have in place?",
    description: "Evaluate data encryption, identity management, and access controls.",
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
    question: "How do you handle third-party vendor security assessments?",
    description: "Assess approach to vendor security evaluation and management.",
    options: [
      {
        value: 1,
        text: "No vendor security program",
        description: "Limited oversight of third-party security"
      },
      {
        value: 2,
        text: "Basic vendor assessments",
        description: "Some security evaluation of vendors"
      },
      {
        value: 3,
        text: "Standard vendor security process",
        description: "Established vendor security evaluation"
      },
      {
        value: 4,
        text: "Comprehensive vendor program",
        description: "Thorough vendor security management"
      },
      {
        value: 5,
        text: "Advanced vendor security",
        description: "Leading practices for vendor and service security"
      }
    ]
  }
];

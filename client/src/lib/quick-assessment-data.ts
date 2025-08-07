import { Question } from "@/lib/assessment-data";

export const quickQuestions: Question[] = [
  // Technology Infrastructure - 3 questions
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
    question: "What is your organization's current data processing capability?",
    description: "Evaluate your systems' ability to handle large datasets and complex computations.",
    options: [
      {
        value: 1,
        text: "Limited processing power",
        description: "Basic systems that struggle with large datasets"
      },
      {
        value: 2,
        text: "Standard business processing",
        description: "Adequate for normal operations but limited for AI workloads"
      },
      {
        value: 3,
        text: "Enhanced processing capabilities",
        description: "Good performance with some capacity for AI tasks"
      },
      {
        value: 4,
        text: "High-performance computing",
        description: "Strong processing power suitable for most AI applications"
      },
      {
        value: 5,
        text: "Enterprise-grade processing",
        description: "Advanced computing infrastructure optimized for AI/ML workloads"
      }
    ]
  },
  {
    id: "technologyInfrastructure_3",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How would you rate your IT infrastructure's scalability and flexibility?",
    description: "Consider your ability to scale resources up or down based on AI project requirements.",
    options: [
      {
        value: 1,
        text: "Very limited scalability",
        description: "Fixed infrastructure with minimal flexibility"
      },
      {
        value: 2,
        text: "Some scalability options",
        description: "Basic ability to adjust resources with significant limitations"
      },
      {
        value: 3,
        text: "Moderate scalability",
        description: "Good flexibility with some constraints on rapid scaling"
      },
      {
        value: 4,
        text: "High scalability",
        description: "Strong ability to scale resources quickly and efficiently"
      },
      {
        value: 5,
        text: "Dynamic auto-scaling",
        description: "Fully automated, elastic infrastructure that scales seamlessly"
      }
    ]
  },
  
  // Data Quality & Access - 3 questions
  {
    id: "dataQuality_1",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "How would you describe the overall quality of your organization's data?",
    description: "Consider data accuracy, completeness, consistency, and timeliness across your systems.",
    options: [
      {
        value: 1,
        text: "Poor data quality",
        description: "Significant data quality issues with many incomplete or inaccurate records"
      },
      {
        value: 2,
        text: "Below average data quality",
        description: "Some data quality issues that require regular cleaning efforts"
      },
      {
        value: 3,
        text: "Average data quality",
        description: "Generally good data with occasional quality issues"
      },
      {
        value: 4,
        text: "High data quality",
        description: "Well-maintained data with minimal quality issues"
      },
      {
        value: 5,
        text: "Excellent data quality",
        description: "Consistently high-quality, well-governed data across all systems"
      }
    ]
  },
  {
    id: "dataQuality_2",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "How easily can your organization access and integrate data from different sources?",
    description: "Evaluate your data accessibility, integration capabilities, and cross-system data flow.",
    options: [
      {
        value: 1,
        text: "Very difficult data access",
        description: "Data is siloed with significant barriers to integration"
      },
      {
        value: 2,
        text: "Limited data integration",
        description: "Some data sources are accessible but integration is challenging"
      },
      {
        value: 3,
        text: "Moderate data integration",
        description: "Good access to most data with some integration capabilities"
      },
      {
        value: 4,
        text: "Strong data integration",
        description: "Well-integrated data systems with good accessibility"
      },
      {
        value: 5,
        text: "Seamless data integration",
        description: "Fully integrated data ecosystem with real-time accessibility"
      }
    ]
  },
  {
    id: "dataQuality_3",
    dimension: "dataQuality",
    dimensionLabel: "Data Quality & Access",
    icon: "Database",
    question: "What percentage of your data is currently structured and ready for analysis?",
    description: "Consider how much of your data is organized, labeled, and suitable for AI/ML processing.",
    options: [
      {
        value: 1,
        text: "Less than 20% structured",
        description: "Most data is unstructured or poorly organized"
      },
      {
        value: 2,
        text: "20-40% structured",
        description: "Some structured data but significant organization needed"
      },
      {
        value: 3,
        text: "40-60% structured",
        description: "Moderate amount of well-organized, analysis-ready data"
      },
      {
        value: 4,
        text: "60-80% structured",
        description: "Most data is well-structured and suitable for analysis"
      },
      {
        value: 5,
        text: "Over 80% structured",
        description: "Comprehensive data organization with excellent structure"
      }
    ]
  },
  
  // Team AI Literacy - 2 questions
  {
    id: "teamLiteracy_1",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "What is the general level of AI knowledge among your key team members?",
    description: "Consider understanding of AI concepts, capabilities, and limitations across your organization.",
    options: [
      {
        value: 1,
        text: "Very limited AI knowledge",
        description: "Most team members have minimal understanding of AI"
      },
      {
        value: 2,
        text: "Basic AI awareness",
        description: "Some general knowledge but limited practical understanding"
      },
      {
        value: 3,
        text: "Moderate AI literacy",
        description: "Good foundational knowledge with some practical experience"
      },
      {
        value: 4,
        text: "Strong AI competency",
        description: "Well-informed team with practical AI experience"
      },
      {
        value: 5,
        text: "Advanced AI expertise",
        description: "Highly knowledgeable team with extensive AI experience"
      }
    ]
  },
  {
    id: "teamLiteracy_2",
    dimension: "teamLiteracy",
    dimensionLabel: "Team AI Literacy",
    icon: "Users",
    question: "How comfortable is your team with adopting new technologies and workflows?",
    description: "Assess your organization's change management capabilities and technology adoption rate.",
    options: [
      {
        value: 1,
        text: "Resistant to change",
        description: "Team typically struggles with new technology adoption"
      },
      {
        value: 2,
        text: "Cautious about change",
        description: "Some resistance but willing to adapt with proper support"
      },
      {
        value: 3,
        text: "Moderately adaptable",
        description: "Generally open to change with adequate training"
      },
      {
        value: 4,
        text: "Highly adaptable",
        description: "Team embraces new technologies and workflows readily"
      },
      {
        value: 5,
        text: "Innovation-driven",
        description: "Team actively seeks out and implements new technologies"
      }
    ]
  },
  
  // System Integration - 2 questions
  {
    id: "systemIntegration_1",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "How well do your current business systems communicate with each other?",
    description: "Evaluate the integration level between your CRM, ERP, databases, and other core systems.",
    options: [
      {
        value: 1,
        text: "Isolated systems",
        description: "Systems operate independently with minimal communication"
      },
      {
        value: 2,
        text: "Limited integration",
        description: "Some basic connections but mostly manual data transfer"
      },
      {
        value: 3,
        text: "Moderate integration",
        description: "Good integration between key systems with some gaps"
      },
      {
        value: 4,
        text: "Well-integrated systems",
        description: "Strong integration across most business systems"
      },
      {
        value: 5,
        text: "Fully integrated ecosystem",
        description: "Seamless integration across all business systems"
      }
    ]
  },
  {
    id: "systemIntegration_2",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "How flexible are your current systems for adding new AI-powered features?",
    description: "Consider API availability, system architecture, and ease of implementing new integrations.",
    options: [
      {
        value: 1,
        text: "Very inflexible",
        description: "Legacy systems with limited API access or integration options"
      },
      {
        value: 2,
        text: "Somewhat inflexible",
        description: "Some integration possibilities but with significant limitations"
      },
      {
        value: 3,
        text: "Moderately flexible",
        description: "Good integration capabilities with some constraints"
      },
      {
        value: 4,
        text: "Highly flexible",
        description: "Modern architecture with strong API support and integration options"
      },
      {
        value: 5,
        text: "Extremely flexible",
        description: "Microservices architecture with extensive API ecosystem"
      }
    ]
  },
  
  // Budget & Resources - 2 questions
  {
    id: "budgetResources_1",
    dimension: "budgetResources",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "What budget range has been allocated for AI initiatives over the next 12 months?",
    description: "Consider both direct technology costs and related expenses like training and consulting.",
    options: [
      {
        value: 1,
        text: "No specific budget allocated",
        description: "AI initiatives would need to be funded ad-hoc"
      },
      {
        value: 2,
        text: "Limited budget ($10K - $50K)",
        description: "Small budget for basic AI exploration or pilot projects"
      },
      {
        value: 3,
        text: "Moderate budget ($50K - $200K)",
        description: "Adequate funding for meaningful AI implementation"
      },
      {
        value: 4,
        text: "Substantial budget ($200K - $500K)",
        description: "Strong budget allocation for comprehensive AI initiatives"
      },
      {
        value: 5,
        text: "Significant budget ($500K+)",
        description: "Major investment planned for extensive AI transformation"
      }
    ]
  },
  {
    id: "budgetResources_2",
    dimension: "budgetResources",
    dimensionLabel: "Budget & Resources",
    icon: "DollarSign",
    question: "How much dedicated time can your team allocate to AI implementation projects?",
    description: "Consider the availability of team members to focus on AI initiatives alongside current responsibilities.",
    options: [
      {
        value: 1,
        text: "Very limited time",
        description: "Team is fully occupied with current responsibilities"
      },
      {
        value: 2,
        text: "Minimal time availability",
        description: "Some spare time available but limited capacity"
      },
      {
        value: 3,
        text: "Moderate time allocation",
        description: "Good capacity to dedicate to AI projects part-time"
      },
      {
        value: 4,
        text: "Substantial time commitment",
        description: "Significant capacity available for focused AI work"
      },
      {
        value: 5,
        text: "Dedicated AI team/resources",
        description: "Full-time resources allocated specifically for AI initiatives"
      }
    ]
  },
  
  // Data Security - 2 questions
  {
    id: "dataSecurity_1",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How robust are your current data security and privacy protection measures?",
    description: "Consider encryption, access controls, compliance frameworks, and data protection policies.",
    options: [
      {
        value: 1,
        text: "Basic security measures",
        description: "Minimal security protocols with limited data protection"
      },
      {
        value: 2,
        text: "Standard security practices",
        description: "Basic security measures in place but room for improvement"
      },
      {
        value: 3,
        text: "Good security framework",
        description: "Solid security practices with most essential protections"
      },
      {
        value: 4,
        text: "Strong security posture",
        description: "Comprehensive security measures with regular updates"
      },
      {
        value: 5,
        text: "Enterprise-grade security",
        description: "Advanced security framework with industry-leading practices"
      }
    ]
  },
  {
    id: "dataSecurity_2",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "What is your organization's compliance status with data protection regulations?",
    description: "Consider GDPR, CCPA, HIPAA, or other applicable privacy and data protection requirements.",
    options: [
      {
        value: 1,
        text: "Limited compliance knowledge",
        description: "Minimal understanding of applicable regulations"
      },
      {
        value: 2,
        text: "Basic compliance efforts",
        description: "Some compliance measures but gaps remain"
      },
      {
        value: 3,
        text: "Good compliance standing",
        description: "Generally compliant with most applicable regulations"
      },
      {
        value: 4,
        text: "Strong compliance framework",
        description: "Comprehensive compliance with regular audits"
      },
      {
        value: 5,
        text: "Exemplary compliance",
        description: "Industry-leading compliance with proactive measures"
      }
    ]
  }
];
import { Question } from "@/lib/assessment-data";

export const quickQuestions: Question[] = [
  // Technology Infrastructure - 3 questions
  {
    id: "technologyInfrastructure_1",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How would you describe your organization's current technology setup?",
    description: "Consider whether your systems are modern, flexible, and can handle increased workloads. For Example: Do you use cloud services like Microsoft 365 or Google Workspace, or do you still rely on older desktop software and local servers?",
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
    description: "Consider your systems' ability to process and analyze significant volumes of information. For Example: Can you easily generate reports from years of customer data, or do large data exports crash your systems and take hours to complete?",
    options: [
      {
        value: 1,
        text: "Struggles with large data volumes",
        description: "Current systems have difficulty processing substantial amounts of data"
      },
      {
        value: 2,
        text: "Handles current business needs",
        description: "Adequate for day-to-day operations but limited for advanced analytics"
      },
      {
        value: 3,
        text: "Good data processing capabilities",
        description: "Strong performance with capacity for business intelligence projects"
      },
      {
        value: 4,
        text: "Advanced data processing power",
        description: "Excellent capability for complex analytics and automation projects"
      },
      {
        value: 5,
        text: "Enterprise-scale data processing",
        description: "Sophisticated systems capable of handling massive data volumes efficiently"
      }
    ]
  },
  {
    id: "technologyInfrastructure_3",
    dimension: "technologyInfrastructure",
    dimensionLabel: "Technology Infrastructure",
    icon: "Server",
    question: "How easily can your organization expand or adapt its technology systems?",
    description: "Consider your ability to adjust technology resources based on changing business needs. For Example: If your business suddenly needed to support remote work for all employees, could your systems handle the increased load and new requirements, or would you need major upgrades?",
    options: [
      {
        value: 1,
        text: "Very difficult to expand",
        description: "Systems are fixed with minimal ability to grow or change"
      },
      {
        value: 2,
        text: "Some expansion possible",
        description: "Basic ability to grow systems but with significant limitations"
      },
      {
        value: 3,
        text: "Moderate expansion capability",
        description: "Good flexibility with some constraints on rapid growth"
      },
      {
        value: 4,
        text: "Easy to expand and adapt",
        description: "Strong ability to grow and modify systems quickly"
      },
      {
        value: 5,
        text: "Highly flexible and adaptive",
        description: "Systems automatically adjust to changing business demands"
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
    description: "Consider data accuracy, completeness, consistency, and timeliness across your systems. For Example: When you look at customer information in your database, is it up-to-date and complete, or do you often find missing details, duplicate entries, and outdated contact information?",
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
    description: "Evaluate your data accessibility, integration capabilities, and cross-system data flow. For Example: Can you easily create a report that combines sales data, customer information, and inventory levels, or would this require manually collecting data from multiple separate systems?",
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
    question: "What percentage of your business data is well-organized and ready for analysis?",
    description: "Consider how much of your data is properly organized and suitable for business intelligence. For Example: What percentage of your business data could you use right now to create meaningful reports and insights without major cleanup or reorganization work?",
    options: [
      {
        value: 1,
        text: "Less than 20% well-organized",
        description: "Most data is disorganized or difficult to access for analysis"
      },
      {
        value: 2,
        text: "20-40% well-organized",
        description: "Some organized data but significant cleanup needed"
      },
      {
        value: 3,
        text: "40-60% well-organized",
        description: "Moderate amount of clean, analysis-ready business data"
      },
      {
        value: 4,
        text: "60-80% well-organized",
        description: "Most data is properly organized and suitable for analysis"
      },
      {
        value: 5,
        text: "Over 80% well-organized",
        description: "Comprehensive data organization with excellent accessibility"
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
    description: "Consider understanding of AI concepts, capabilities, and limitations across your organization. For Example: Can your key team members explain how AI might help your business and what it cannot do, or do most people have little understanding of what AI actually is?",
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
    description: "Assess your organization's change management capabilities and technology adoption rate. For Example: When you introduced new software or changed processes in the past, did your team adapt quickly and embrace the changes, or was there significant resistance and slow adoption?",
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
    question: "How well do your business systems work together and share information?",
    description: "Consider how easily information flows between your customer management, accounting, and other key business systems. For Example: When a customer places an order, does it automatically update your inventory and accounting systems, or do you have to manually enter the same information in multiple places?",
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
    question: "How easily can you add new automated features to your current systems?",
    description: "Consider how simple it would be to connect new tools or add automation to your existing business systems. For Example: If you wanted to add an automated email system that sends follow-up messages based on customer actions, would this be easy to implement with your current systems?",
    options: [
      {
        value: 1,
        text: "Very difficult to modify",
        description: "Older systems with limited ability to connect new tools"
      },
      {
        value: 2,
        text: "Somewhat difficult to modify",
        description: "Some connection possibilities but with significant limitations"
      },
      {
        value: 3,
        text: "Moderately easy to modify",
        description: "Good ability to add new features with some constraints"
      },
      {
        value: 4,
        text: "Easy to modify and expand",
        description: "Modern systems with strong ability to connect new tools"
      },
      {
        value: 5,
        text: "Extremely flexible and adaptable",
        description: "Advanced system design that easily accommodates new features"
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
    description: "Consider both direct technology costs and related expenses like training and consulting. For Example: Has your company set aside specific money for AI projects, including software costs, training, and expert help, or would AI initiatives need to compete with other priorities for funding?",
    options: [
      {
        value: 1,
        text: "No specific budget allocated",
        description: "AI initiatives would need to be funded ad-hoc"
      },
      {
        value: 2,
        text: "Limited budget available",
        description: "Small budget for basic AI exploration or pilot projects"
      },
      {
        value: 3,
        text: "Moderate budget allocated",
        description: "Adequate funding for meaningful AI implementation"
      },
      {
        value: 4,
        text: "Substantial budget committed",
        description: "Strong budget allocation for comprehensive AI initiatives"
      },
      {
        value: 5,
        text: "Significant investment planned",
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
    description: "Consider the availability of team members to focus on AI initiatives alongside current responsibilities. For Example: Could key employees spend significant time learning about and implementing AI tools, or are they too busy with daily operations to take on additional projects?",
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
    question: "How strong are your organization's data security and privacy protections?",
    description: "Consider your safeguards for protecting sensitive business and customer information. For Example: Do you have strong passwords, secure access controls, regular backups, and employee training about cybersecurity, or do you rely mainly on basic security measures?",
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
    question: "How well does your organization comply with data protection and privacy laws?",
    description: "Consider your compliance with relevant privacy regulations that apply to your industry and location. For Example: If a customer asked to see all the personal information you have about them or requested to delete their data, could you easily fulfill this request, or would it be complicated to find and manage their information across your systems?",
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
  },

  // Additional Data Security question to reach 15 total
  {
    id: "dataSecurity_3",
    dimension: "dataSecurity",
    dimensionLabel: "Data Security & Privacy",
    icon: "Shield",
    question: "How do you currently handle data backup and disaster recovery?",
    description: "Consider your backup frequency, recovery procedures, and business continuity planning. For Example: If your main systems crashed tomorrow, could you quickly restore all your business data and get back to normal operations, or would you lose important information and face significant downtime?",
    options: [
      {
        value: 1,
        text: "No formal backup strategy",
        description: "Limited or inconsistent data backup procedures"
      },
      {
        value: 2,
        text: "Basic backup processes",
        description: "Some backup procedures but limited disaster recovery planning"
      },
      {
        value: 3,
        text: "Good backup and recovery",
        description: "Regular backups with documented recovery procedures"
      },
      {
        value: 4,
        text: "Comprehensive disaster recovery",
        description: "Robust backup system with tested recovery procedures"
      },
      {
        value: 5,
        text: "Enterprise-grade resilience",
        description: "Advanced backup, disaster recovery, and business continuity planning"
      }
    ]
  }
];
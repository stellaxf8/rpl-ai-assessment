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
    question: "How would you describe your organization's current technology stack?",
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
    description: "Consider your systems' ability to store and process significant volumes of business information. For Example: Can you easily generate reports from years of customer data, or do large data exports crash your systems and take hours to complete?",
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
    description: "Consider your ability to integrate new services and connect different business applications. For Example: When you add a new customer management tool, does it automatically sync with your existing email and accounting software, or do you have to manually copy data between systems?",
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
    description: "Consider your ability to monitor business systems and quickly detect issues. For Example: Do you get alerts when your website is slow or when your email server is down, or do you only find out when employees complain that something isn't working?",
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
    description: "Consider connection speed, reliability, and capacity for business operations. For Example: Can multiple employees video conference simultaneously without issues, or does internet slow down when several people are working online at the same time?",
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
    description: "Consider data accuracy, completeness, consistency, and reliability. For Example: Are customer contact details up-to-date and complete, or do you often find missing phone numbers, duplicate records, and outdated addresses in your system?",
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
    description: "Evaluate how easily teams can access and work with organizational data. For Example: Can your marketing team quickly get sales data to create reports, or do they need to submit requests to IT and wait weeks to get the information they need?",
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
    description: "Consider data policies, ownership, and management processes. For Example: Do you have clear rules about who can access customer data and how it should be used, or can anyone in the company access any data without restrictions or oversight?",
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
    description: "Assess the availability of data dictionaries, metadata, and documentation. For Example: When a new employee needs to understand your sales data, can they find clear explanations of what each field means, or do they have to ask around to figure out how the data is organized?",
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
    description: "Consider data format, structure, and readiness for analysis. For Example: Is your data organized in spreadsheets and databases that can be easily analyzed, or is most of your business information stored in emails, paper documents, and unstructured formats?",
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
    description: "Assess the overall understanding of AI concepts and applications. For Example: Can your team explain what AI could do for your business and give specific examples, or do most people think AI is just science fiction and have no idea how it might help your company?",
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
    description: "Consider practical experience with AI platforms, frameworks, or tools. For Example: Has anyone on your team actually used AI tools like ChatGPT for business tasks, built automated reports, or worked with data analysis software to find patterns in your business data?",
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
    description: "Gauge the team's attitude and willingness to embrace AI. For Example: When AI tools are mentioned, does your team get excited about the possibilities and ask lots of questions, or do they worry about job security and prefer to stick with current manual processes?",
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
    description: "Evaluate current and planned AI learning initiatives. For Example: Do you provide courses or workshops where employees can learn about AI and practice using AI tools, or do people have to figure out AI on their own time without company support?",
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
    description: "Assess foundational skills in data analysis and statistical thinking. For Example: Can your team create charts and graphs from business data to spot trends and make decisions, or do they struggle with anything beyond basic spreadsheet calculations?",
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
    description: "Consider the connectivity and data flow between existing systems. For Example: When a customer makes a purchase, does the information automatically update in your inventory, accounting, and customer service systems, or do you have to manually enter the same data in multiple places?",
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
    question: "How easily can your current systems work with new automated business tools?",
    description: "Consider how well your existing systems can connect with modern automation solutions. For Example: If you wanted to add a chatbot to your website that could check order status, could it easily access your order database, or would you need to completely rebuild your systems to make this work?",
    options: [
      {
        value: 1,
        text: "Older systems cannot connect",
        description: "Current systems cannot work with modern automation tools"
      },
      {
        value: 2,
        text: "Limited ability to connect",
        description: "Some systems can connect but requires significant work"
      },
      {
        value: 3,
        text: "Moderate ability to connect",
        description: "Most systems can connect with some adjustments"
      },
      {
        value: 4,
        text: "Easy to connect new tools",
        description: "Systems work well with modern automation solutions"
      },
      {
        value: 5,
        text: "Built for modern automation",
        description: "Systems are designed to easily work with any new business tools"
      }
    ]
  },
  {
    id: "systemIntegration_3",
    dimension: "systemIntegration",
    dimensionLabel: "System Integration",
    icon: "Puzzle",
    question: "What is your experience with implementing new technology solutions?",
    description: "Consider your track record with technology adoption and integration. For Example: When you've added new software like accounting systems or customer management tools, did the implementation go smoothly and on time, or did it take much longer than expected with lots of problems?",
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
    description: "Evaluate the adaptability of your systems to new requirements. For Example: If you needed to add a new feature like mobile access to your business data, would this be a simple update, or would you need to rebuild major parts of your technology setup?",
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
    description: "Assess capability for real-time AI applications and responses. For Example: Can your systems immediately update inventory levels when a sale happens and instantly notify customers about shipping updates, or do these updates only happen once a day when reports are run?",
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
    description: "Consider current and planned budget for AI technology and implementation. For Example: Has your company set aside specific money for exploring AI tools and hiring specialists, or are AI projects expected to come out of the general IT budget with no dedicated funding?",
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
    description: "Assess commitment to developing internal AI capabilities. For Example: Would your company pay for employees to attend AI workshops or online courses, or do leaders expect staff to learn about AI on their own time without company support?",
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
    description: "Consider budget and plans for bringing in AI expertise. For Example: Could your company afford to hire a data scientist or AI specialist with competitive salary and benefits, or are you limited to using existing employees who would learn AI skills alongside their current jobs?",
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
    description: "Consider budget for automation platforms, software, and technology systems. For Example: Could your company purchase AI software licenses, cloud computing services, and automation platforms that might cost thousands of dollars monthly, or are you limited to free or very low-cost tools?",
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
    description: "Consider leadership expectations for return on AI investment. For Example: Does leadership expect AI projects to save money or increase revenue within a few months, or are they willing to wait 1-2 years to see significant returns on AI investments?",
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
    description: "Consider current security policies, procedures, and protection systems. For Example: Do you have firewalls, regular security updates, employee training about phishing emails, and incident response plans, or do you mainly rely on basic antivirus software and hope for the best?",
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
    question: "What is your approach to data privacy and protection?",
    description: "Consider privacy policies, data handling, and regulatory compliance. For Example: Do you have clear rules about who can access customer information, how long you keep personal data, and what you do if there's a data breach, or do you handle customer data without formal privacy policies?",
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
    description: "Assess ability to meet GDPR, CCPA, and other data protection regulations. For Example: Can you quickly provide customers with all the personal data you have about them if they request it, delete their information when asked, and document how you handle their privacy, or would these requests create major challenges?",
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
    description: "Evaluate data encryption, identity management, and access controls. For Example: Do employees need special permission and secure passwords to access sensitive business data, and is that data scrambled (encrypted) so it can't be read if stolen, or can anyone in your company access any data with basic passwords?",
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
    description: "Assess approach to vendor security evaluation and management. For Example: Before using software from other companies or cloud services, do you check their security practices and require them to meet your security standards, or do you simply trust that external vendors are secure without verification?",
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

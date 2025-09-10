import { Question } from './assessment-data';

export interface IndustryQuestionVariation {
  industry: string;
  questionId: string;
  question: string;
  description: string;
  options: {
    value: number;
    text: string;
    description: string;
  }[];
}

// Healthcare-specific question variations
export const healthcareVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Healthcare',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your healthcare technology systems and patient record integration?',
    description: 'Consider your patient record systems, medical device connectivity, and healthcare technology platforms. For Example: Can your patient records automatically receive updates from medical devices like heart monitors or lab equipment, or do staff have to manually enter this information into separate systems?',
    options: [
      {
        value: 1,
        text: 'Basic patient records with limited integration',
        description: 'Standalone patient record system with minimal device connectivity'
      },
      {
        value: 2,
        text: 'Moderate patient records with some device integration',
        description: 'Good patient record foundation with basic medical device connectivity'
      },
      {
        value: 3,
        text: 'Integrated healthcare technology platform',
        description: 'Well-connected patient records with most medical devices and systems integrated'
      },
      {
        value: 4,
        text: 'Advanced healthcare technology ecosystem',
        description: 'Comprehensive integration of patient records, medical devices, and care systems'
      },
      {
        value: 5,
        text: 'AI-ready healthcare technology',
        description: 'Fully integrated platform optimized for AI-powered patient care analytics'
      }
    ]
  },
  {
    industry: 'Healthcare',
    questionId: 'dataQuality_1',
    question: 'How would you describe the quality of your patient data and medical records?',
    description: 'Consider data accuracy, completeness, and compliance with healthcare privacy regulations. For Example: Are your patient records complete and up-to-date across all departments, or do you often find missing information, duplicate entries, and inconsistent data between different medical systems?',
    options: [
      {
        value: 1,
        text: 'Poor data quality with compliance issues',
        description: 'Significant issues with patient data accuracy and regulatory compliance'
      },
      {
        value: 2,
        text: 'Inconsistent patient data quality',
        description: 'Some patient data is good, but quality varies across departments'
      },
      {
        value: 3,
        text: 'Privacy-compliant with moderate quality',
        description: 'Generally reliable patient data with basic compliance measures'
      },
      {
        value: 4,
        text: 'High-quality patient records with strong governance',
        description: 'Well-structured patient records with established standards'
      },
      {
        value: 5,
        text: 'Excellent patient data with advanced analytics',
        description: 'Consistently high-quality patient data optimized for healthcare insights'
      }
    ]
  },
  {
    industry: 'Healthcare',
    questionId: 'budgetResources_1',
    question: 'What budget range has been allocated for healthcare AI and digital health initiatives over the next 12 months?',
    description: 'Consider investments in clinical AI tools, population health analytics, and healthcare-specific technology.',
    options: [
      {
        value: 1,
        text: 'No specific healthcare AI budget',
        description: 'Digital health initiatives would need to be funded from general IT budget'
      },
      {
        value: 2,
        text: 'Limited healthcare AI budget',
        description: 'Small budget for basic clinical AI tools or pilot programs'
      },
      {
        value: 3,
        text: 'Moderate healthcare AI budget',
        description: 'Adequate funding for meaningful clinical AI implementation'
      },
      {
        value: 4,
        text: 'Substantial healthcare investment',
        description: 'Strong budget for comprehensive clinical AI initiatives'
      },
      {
        value: 5,
        text: 'Major digital health transformation budget',
        description: 'Significant investment for extensive healthcare AI and digital health transformation'
      }
    ]
  },
  {
    industry: 'Healthcare',
    questionId: 'dataSecurity_1',
    question: 'How robust are your patient privacy and data security measures?',
    description: 'Assess your organization\'s ability to protect patient health information and meet regulatory requirements. For Example: Do you have secure systems that restrict access to patient data based on job roles, regular security training for staff, and clear procedures for handling data breaches to maintain privacy compliance?',
    options: [
      {
        value: 1,
        text: 'Basic privacy compliance',
        description: 'Minimal security measures with potential compliance gaps'
      },
      {
        value: 2,
        text: 'Standard healthcare security',
        description: 'Basic privacy compliance but limited advanced security measures'
      },
      {
        value: 3,
        text: 'Good healthcare security framework',
        description: 'Solid privacy compliance with established security protocols'
      },
      {
        value: 4,
        text: 'Advanced healthcare security',
        description: 'Comprehensive security with regular audits and monitoring'
      },
      {
        value: 5,
        text: 'Industry-leading healthcare security',
        description: 'State-of-the-art security with AI-powered threat detection'
      }
    ]
  }
];

// Manufacturing-specific question variations
export const manufacturingVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Manufacturing',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your manufacturing technology systems and smart factory readiness?',
    description: 'Consider your industrial networks, edge computing capabilities, and smart manufacturing systems. For Example: Can your production equipment automatically communicate with your business systems to update inventory and scheduling, or do you rely on manual processes to track what happens on the factory floor?',
    options: [
      {
        value: 1,
        text: 'Basic manufacturing IT',
        description: 'Traditional manufacturing systems with limited digital connectivity'
      },
      {
        value: 2,
        text: 'Emerging Industry 4.0 adoption',
        description: 'Some connected equipment with developing digital systems'
      },
      {
        value: 3,
        text: 'Moderate smart manufacturing',
        description: 'Good foundation of connected systems with growing analytics capabilities'
      },
      {
        value: 4,
        text: 'Advanced Industry 4.0 implementation',
        description: 'Comprehensive smart manufacturing with real-time data processing'
      },
      {
        value: 5,
        text: 'Fully autonomous manufacturing',
        description: 'Complete Industry 4.0 ecosystem with AI-driven production optimization'
      }
    ]
  },
  {
    industry: 'Manufacturing',
    questionId: 'technologyInfrastructure_2',
    question: 'What is your current connected device and sensor data processing capacity?',
    description: 'Evaluate your ability to handle real-time manufacturing data and equipment sensor feeds. For Example: Can you monitor machine performance, temperature, and production quality in real-time across your factory, or do you only get this information through periodic manual checks and reports?',
    options: [
      {
        value: 1,
        text: 'Limited connected devices',
        description: 'Few connected devices with basic data collection'
      },
      {
        value: 2,
        text: 'Basic connected equipment deployment',
        description: 'Some connected equipment but limited data processing'
      },
      {
        value: 3,
        text: 'Moderate smart manufacturing adoption',
        description: 'Good sensor coverage with developing analytics capabilities'
      },
      {
        value: 4,
        text: 'Advanced smart manufacturing',
        description: 'Comprehensive connected equipment with real-time analytics and automation'
      },
      {
        value: 5,
        text: 'Fully connected smart factory',
        description: 'Complete digital manufacturing with AI-driven optimization'
      }
    ]
  },
  {
    industry: 'Manufacturing',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of smart manufacturing and AI knowledge among your operations and engineering teams?',
    description: 'Assess understanding of automated manufacturing, predictive maintenance, and AI-driven production optimization. For Example: Do your teams understand how AI could predict when machines need maintenance or optimize production schedules, or is their experience mainly with traditional manufacturing approaches?',
    options: [
      {
        value: 1,
        text: 'Traditional manufacturing skills',
        description: 'Strong mechanical skills but limited digital manufacturing knowledge'
      },
      {
        value: 2,
        text: 'Basic automation experience',
        description: 'Familiar with basic automation controls but limited AI understanding'
      },
      {
        value: 3,
        text: 'Moderate smart manufacturing awareness',
        description: 'Good understanding of automated manufacturing concepts with some practical experience'
      },
      {
        value: 4,
        text: 'Advanced manufacturing technology skills',
        description: 'Strong digital manufacturing background with AI implementation experience'
      },
      {
        value: 5,
        text: 'Manufacturing AI expertise',
        description: 'Deep knowledge of AI applications in production, quality control, and supply chain'
      }
    ]
  },
  {
    industry: 'Manufacturing',
    questionId: 'systemIntegration_1',
    question: 'How well integrated are your production systems, quality control, and supply chain management?',
    description: 'Evaluate integration between production management systems, business systems, quality systems, and supplier networks. For Example: When you receive a new order, does it automatically flow through to production planning, inventory management, and supplier orders, or do different departments handle these processes separately?',
    options: [
      {
        value: 1,
        text: 'Isolated manufacturing systems',
        description: 'Separate production, quality, and supply chain systems'
      },
      {
        value: 2,
        text: 'Basic manufacturing integration',
        description: 'Some system connections but limited real-time visibility'
      },
      {
        value: 3,
        text: 'Moderate production integration',
        description: 'Good integration between core manufacturing systems'
      },
      {
        value: 4,
        text: 'Advanced manufacturing ecosystem',
        description: 'Strong integration across production, quality, and supply chain'
      },
      {
        value: 5,
        text: 'Seamless smart factory',
        description: 'Complete integration optimized for intelligent manufacturing'
      }
    ]
  },
  {
    industry: 'Manufacturing',
    questionId: 'dataQuality_5',
    question: 'How prepared is your manufacturing data for predictive maintenance and quality control AI?',
    description: 'Consider production data, sensor readings, and quality metrics readiness for AI analysis. For Example: Do you have organized data from your production line showing machine performance, product quality, and maintenance history that could be used to predict problems before they happen?',
    options: [
      {
        value: 1,
        text: 'Raw manufacturing data only',
        description: 'Basic production logs without standardization'
      },
      {
        value: 2,
        text: 'Some structured production data',
        description: 'Basic data collection but needs significant preparation'
      },
      {
        value: 3,
        text: 'Moderately organized manufacturing data',
        description: 'Good data structure with some AI readiness'
      },
      {
        value: 4,
        text: 'Well-structured production analytics',
        description: 'Comprehensive manufacturing data optimized for insights'
      },
      {
        value: 5,
        text: 'AI-optimized manufacturing data',
        description: 'Complete data pipeline for predictive analytics and automation'
      }
    ]
  }
];

// Finance-specific question variations
export const financeVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Finance',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your financial technology systems and real-time processing capabilities?',
    description: 'Consider your core banking systems, trading platforms, and real-time transaction processing capacity. For Example: Can your systems instantly process transactions, detect fraud in real-time, and provide immediate account updates to customers, or do these processes take significant time and manual intervention?',
    options: [
      {
        value: 1,
        text: 'Legacy financial systems',
        description: 'Traditional banking systems with limited real-time capabilities'
      },
      {
        value: 2,
        text: 'Modernizing financial IT',
        description: 'Mix of legacy and modern systems with developing real-time processing'
      },
      {
        value: 3,
        text: 'Modern financial platform',
        description: 'Good foundation for real-time processing with scalable architecture'
      },
      {
        value: 4,
        text: 'Advanced fintech systems',
        description: 'High-performance systems with comprehensive real-time capabilities'
      },
      {
        value: 5,
        text: 'AI-native financial platform',
        description: 'Next-generation systems optimized for AI-driven financial services'
      }
    ]
  },
  {
    industry: 'Finance',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of digital finance and financial AI knowledge among your teams?',
    description: 'Assess understanding of automated trading, digital advisory services, and AI-powered risk management. For Example: Do your teams understand how AI could automate investment advice, detect suspicious transactions, or assess loan risks, or is their expertise mainly in traditional banking and finance methods?',
    options: [
      {
        value: 1,
        text: 'Traditional finance skills',
        description: 'Strong financial knowledge but limited digital finance or AI understanding'
      },
      {
        value: 2,
        text: 'Basic digital banking awareness',
        description: 'Familiar with digital banking but limited AI applications knowledge'
      },
      {
        value: 3,
        text: 'Moderate financial technology literacy',
        description: 'Good understanding of digital finance with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced digital finance skills',
        description: 'Strong financial technology background with AI implementation experience'
      },
      {
        value: 5,
        text: 'Financial AI expertise',
        description: 'Deep knowledge of AI applications in trading, risk management, and customer service'
      }
    ]
  },
  {
    industry: 'Finance',
    questionId: 'dataSecurity_1',
    question: 'How comprehensive are your financial data security and regulatory compliance measures?',
    description: 'Assess compliance with financial regulations and data security requirements for financial institutions. For Example: Do you have systems that automatically detect suspicious transactions, maintain detailed audit trails, and ensure compliance with banking regulations like PCI DSS and SOX requirements?',
    options: [
      {
        value: 1,
        text: 'Basic regulatory compliance',
        description: 'Minimal compliance with significant security gaps'
      },
      {
        value: 2,
        text: 'Standard financial security',
        description: 'Basic compliance but limited advanced security measures'
      },
      {
        value: 3,
        text: 'Good financial security framework',
        description: 'Solid compliance with established security protocols'
      },
      {
        value: 4,
        text: 'Advanced financial security',
        description: 'Comprehensive security with real-time fraud detection'
      },
      {
        value: 5,
        text: 'Industry-leading financial security',
        description: 'State-of-the-art security with AI-powered risk management'
      }
    ]
  },
  {
    industry: 'Finance',
    questionId: 'dataQuality_5',
    question: 'How prepared is your financial data for AI-driven risk assessment and fraud detection?',
    description: 'Consider transaction data, customer information, and risk metrics readiness for AI analysis. For Example: Do you have clean, organized data about customer transactions, credit history, and financial behavior that could be used to automatically detect fraud or assess loan risks?',
    options: [
      {
        value: 1,
        text: 'Basic financial records',
        description: 'Standard accounting data without AI optimization'
      },
      {
        value: 2,
        text: 'Structured financial data',
        description: 'Good data organization but limited AI readiness'
      },
      {
        value: 3,
        text: 'Analytics-ready financial data',
        description: 'Well-structured data with some risk modeling capabilities'
      },
      {
        value: 4,
        text: 'Advanced financial analytics data',
        description: 'Comprehensive data optimized for risk and compliance analytics'
      },
      {
        value: 5,
        text: 'AI-optimized financial data',
        description: 'Complete data pipeline for real-time risk assessment and fraud detection'
      }
    ]
  }
];

// Retail-specific question variations
export const retailVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Retail',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your retail technology systems across all sales channels?',
    description: 'Consider your e-commerce platform, POS systems, inventory management, and customer data integration. For Example: When a customer shops both online and in-store, can you see their complete purchase history and preferences across all channels, or are these systems separate and disconnected?',
    options: [
      {
        value: 1,
        text: 'Basic retail systems',
        description: 'Separate online and offline systems with limited integration'
      },
      {
        value: 2,
        text: 'Developing omnichannel',
        description: 'Some integration between channels but inconsistent customer experience'
      },
      {
        value: 3,
        text: 'Integrated retail platform',
        description: 'Good omnichannel foundation with unified customer view'
      },
      {
        value: 4,
        text: 'Advanced retail technology',
        description: 'Comprehensive omnichannel platform with real-time inventory and customer insights'
      },
      {
        value: 5,
        text: 'AI-powered retail ecosystem',
        description: 'Fully integrated platform optimized for personalization and predictive analytics'
      }
    ]
  },
  {
    industry: 'Retail',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of retail technology and e-commerce AI knowledge among your teams?',
    description: 'Assess understanding of personalization engines, demand forecasting, and customer analytics. For Example: Do your teams understand how AI could automatically recommend products to customers, predict which items will sell well, or analyze shopping patterns to improve store layouts?',
    options: [
      {
        value: 1,
        text: 'Traditional retail skills',
        description: 'Strong merchandising knowledge but limited digital retail understanding'
      },
      {
        value: 2,
        text: 'Basic e-commerce proficiency',
        description: 'Comfortable with online platforms but limited AI applications knowledge'
      },
      {
        value: 3,
        text: 'Moderate retail technology literacy',
        description: 'Good understanding of digital retail with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced retail tech skills',
        description: 'Strong e-commerce and retail technology background with AI experience'
      },
      {
        value: 5,
        text: 'Retail AI expertise',
        description: 'Deep knowledge of AI applications in customer experience and retail operations'
      }
    ]
  },
  {
    industry: 'Retail',
    questionId: 'dataQuality_5',
    question: 'How prepared is your customer and sales data for AI-driven personalization and demand forecasting?',
    description: 'Consider customer behavior data, inventory data, and sales metrics readiness for AI analysis. For Example: Do you have detailed information about what customers buy, when they shop, and how they browse that could be used to personalize their experience and predict future demand?',
    options: [
      {
        value: 1,
        text: 'Basic sales transaction data',
        description: 'Simple POS data without customer insights'
      },
      {
        value: 2,
        text: 'Customer data with limited insights',
        description: 'Basic customer information but fragmented across channels'
      },
      {
        value: 3,
        text: 'Integrated omnichannel data',
        description: 'Good customer journey data with developing analytics'
      },
      {
        value: 4,
        text: 'Advanced retail analytics data',
        description: 'Comprehensive customer and inventory data for insights'
      },
      {
        value: 5,
        text: 'AI-optimized retail data',
        description: 'Complete data ecosystem for personalization and demand prediction'
      }
    ]
  },
  {
    industry: 'Retail',
    questionId: 'systemIntegration_1',
    question: 'How well integrated are your e-commerce, inventory, and customer systems for AI implementation?',
    description: 'Assess the integration between online/offline channels, inventory management, and customer data systems. For Example: When inventory changes in one location, does it automatically update across all sales channels, and can you track a customer\'s complete shopping journey from website visits to in-store purchases?',
    options: [
      {
        value: 1,
        text: 'Siloed retail systems',
        description: 'Separate systems with limited integration'
      },
      {
        value: 2,
        text: 'Basic system connections',
        description: 'Some integration but with data inconsistencies'
      },
      {
        value: 3,
        text: 'Moderate omnichannel integration',
        description: 'Good integration across most customer touchpoints'
      },
      {
        value: 4,
        text: 'Advanced unified commerce platform',
        description: 'Comprehensive integration with real-time data sync'
      },
      {
        value: 5,
        text: 'Seamless omnichannel ecosystem',
        description: 'Complete integration optimized for AI-driven insights'
      }
    ]
  }
];

// Education-specific question variations
export const educationVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Education',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your educational technology systems and learning platforms?',
    description: 'Consider your learning management systems, student information systems, and digital learning platform capabilities. For Example: Can students access all their courses, assignments, and grades in one integrated platform, or do they need to use multiple separate systems for different aspects of their education?',
    options: [
      {
        value: 1,
        text: 'Basic educational IT',
        description: 'Traditional systems with limited digital learning capabilities'
      },
      {
        value: 2,
        text: 'Developing educational technology platform',
        description: 'Good learning management foundation with emerging digital learning tools'
      },
      {
        value: 3,
        text: 'Integrated learning ecosystem',
        description: 'Well-connected educational systems with comprehensive digital learning'
      },
      {
        value: 4,
        text: 'Advanced educational technology systems',
        description: 'Sophisticated learning platforms with analytics and personalization capabilities'
      },
      {
        value: 5,
        text: 'AI-powered learning environment',
        description: 'Next-generation platform optimized for adaptive learning and student success analytics'
      }
    ]
  },
  {
    industry: 'Education',
    questionId: 'systemIntegration_1',
    question: 'How well integrated are your student information systems, learning management, and assessment platforms?',
    description: 'Evaluate integration between student information systems, learning management systems, assessment tools, and communication systems. For Example: When a student submits an assignment, does it automatically update their grades, notify parents, and track their progress across all courses, or do faculty need to manually update multiple systems?',
    options: [
      {
        value: 1,
        text: 'Separate educational systems',
        description: 'Isolated systems requiring manual data transfer between platforms'
      },
      {
        value: 2,
        text: 'Basic educational integration',
        description: 'Some system connections but limited automated data sharing'
      },
      {
        value: 3,
        text: 'Moderate learning platform integration',
        description: 'Good integration between core educational systems'
      },
      {
        value: 4,
        text: 'Advanced educational ecosystem',
        description: 'Strong integration across learning, administrative, and communication systems'
      },
      {
        value: 5,
        text: 'Seamless learning environment',
        description: 'Complete integration optimized for holistic student experience'
      }
    ]
  },
  {
    industry: 'Education',
    questionId: 'budgetResources_1',
    question: 'What budget range has been allocated for educational AI and learning technology over the next 12 months?',
    description: 'Consider investments in adaptive learning, student analytics, and educational AI tools. For Example: Has your institution set aside specific funding for AI-powered learning tools, personalized education platforms, and student success analytics, or would these initiatives compete with other technology priorities?',
    options: [
      {
        value: 1,
        text: 'No specific educational technology AI budget',
        description: 'Educational technology would need to be funded from general IT budget'
      },
      {
        value: 2,
        text: 'Limited educational technology budget available',
        description: 'Small budget for basic educational AI tools or pilot programs'
      },
      {
        value: 3,
        text: 'Moderate learning technology budget',
        description: 'Adequate funding for meaningful educational AI implementation'
      },
      {
        value: 4,
        text: 'Substantial educational investment',
        description: 'Strong budget for comprehensive learning analytics and AI initiatives'
      },
      {
        value: 5,
        text: 'Major digital learning transformation budget',
        description: 'Significant investment for extensive educational AI and adaptive learning systems'
      }
    ]
  },
  {
    industry: 'Education',
    questionId: 'dataQuality_1',
    question: 'How would you describe the quality of your student data and learning analytics?',
    description: 'Consider student information systems, learning management data, and academic performance metrics. For Example: Do you have comprehensive data about student engagement, learning patterns, and academic progress that could be used to identify at-risk students and personalize their educational experience?',
    options: [
      {
        value: 1,
        text: 'Basic student records only',
        description: 'Limited to enrollment and grade data'
      },
      {
        value: 2,
        text: 'Standard academic data',
        description: 'Good academic records but limited learning analytics'
      },
      {
        value: 3,
        text: 'Moderate learning analytics',
        description: 'Some engagement data and performance tracking'
      },
      {
        value: 4,
        text: 'Comprehensive educational data',
        description: 'Rich learning analytics with student outcome tracking'
      },
      {
        value: 5,
        text: 'Advanced learning analytics platform',
        description: 'Complete educational data ecosystem for personalized learning'
      }
    ]
  },
  {
    industry: 'Education',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of AI and educational technology knowledge among faculty and staff?',
    description: 'Assess understanding of AI applications in education and digital learning tools. For Example: Do your faculty and staff understand how AI could personalize learning for each student, automate grading, or identify students who need additional support, or are they mainly familiar with traditional teaching methods?',
    options: [
      {
        value: 1,
        text: 'Limited educational technology knowledge',
        description: 'Basic computer skills with minimal AI awareness'
      },
      {
        value: 2,
        text: 'Basic digital learning tools usage',
        description: 'Comfortable with learning management systems but limited AI understanding'
      },
      {
        value: 3,
        text: 'Moderate educational technology proficiency',
        description: 'Good digital tools usage with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced educational technology skills',
        description: 'Strong educational technology background with AI implementation experience'
      },
      {
        value: 5,
        text: 'Educational AI expertise',
        description: 'Deep understanding of AI applications in learning and teaching'
      }
    ]
  }
];

// Function to get industry-specific question variation
export function getIndustryQuestionVariation(industry: string, questionId: string): IndustryQuestionVariation | null {
  const allVariations = [
    ...healthcareVariations,
    ...manufacturingVariations,
    ...financeVariations,
    ...retailVariations,
    ...educationVariations,
    ...technologyVariations,
    ...governmentVariations,
    ...nonprofitVariations,
    ...consultingVariations,
    ...mediaVariations,
    ...realEstateVariations,
    ...transportationVariations,
    ...energyVariations,
    ...agricultureVariations
  ];
  
  return allVariations.find(variation => 
    variation.industry === industry && variation.questionId === questionId
  ) || null;
}

// Technology industry-specific question variations
export const technologyVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Technology',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your software development and deployment processes?',
    description: 'Consider how modern and automated your software development and release processes are. For Example: Can your development team automatically deploy code changes with testing and rollback capabilities, or do releases require manual processes and significant downtime?',
    options: [
      {
        value: 1,
        text: 'Traditional development environment',
        description: 'Monolithic architecture with basic deployment processes'
      },
      {
        value: 2,
        text: 'Modernizing technology platform',
        description: 'Transitioning to cloud-based systems with developing automation practices'
      },
      {
        value: 3,
        text: 'Modern cloud-based systems',
        description: 'Good modern software systems with automated deployment'
      },
      {
        value: 4,
        text: 'Advanced automated development ecosystem',
        description: 'Comprehensive automated development with advanced deployment and monitoring'
      },
      {
        value: 5,
        text: 'AI-enhanced development platform',
        description: 'Next-generation systems with intelligent development tools'
      }
    ]
  },
  {
    industry: 'Technology',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of AI and machine learning expertise among your development teams?',
    description: 'Assess understanding of machine learning frameworks, AI system deployment, and data science practices. For Example: Can your development teams build and deploy machine learning models, work with frameworks like TensorFlow or PyTorch, and implement AI features in your products, or do they mainly work with traditional software development?',
    options: [
      {
        value: 1,
        text: 'Traditional software development skills',
        description: 'Strong coding abilities but limited AI/ML experience'
      },
      {
        value: 2,
        text: 'Basic AI awareness',
        description: 'Familiar with AI concepts but limited practical implementation'
      },
      {
        value: 3,
        text: 'Moderate machine learning proficiency',
        description: 'Good understanding of machine learning with some project experience'
      },
      {
        value: 4,
        text: 'Advanced AI development skills',
        description: 'Strong ML/AI background with production deployment experience'
      },
      {
        value: 5,
        text: 'AI/ML leadership expertise',
        description: 'Deep technical expertise in AI research and large-scale ML systems'
      }
    ]
  },
  {
    industry: 'Technology',
    questionId: 'dataQuality_1',
    question: 'How would you describe the quality and structure of your user and product data?',
    description: 'Consider data from user interactions, product analytics, system logs, and business metrics. For Example: Do you have comprehensive, clean data about how users interact with your product, system performance metrics, and business outcomes that could be used to build AI features and improve your platform?',
    options: [
      {
        value: 1,
        text: 'Basic application logging',
        description: 'Limited data collection with basic system logs'
      },
      {
        value: 2,
        text: 'Standard analytics implementation',
        description: 'Good user analytics but fragmented data sources'
      },
      {
        value: 3,
        text: 'Integrated data platform',
        description: 'Comprehensive data collection with unified analytics'
      },
      {
        value: 4,
        text: 'Advanced data systems',
        description: 'Real-time data pipeline with high-quality, structured data'
      },
      {
        value: 5,
        text: 'AI-optimized data ecosystem',
        description: 'Complete data platform designed for machine learning and AI applications'
      }
    ]
  }
];

// Government & Public Sector-specific question variations
export const governmentVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Government',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your government technology infrastructure and citizen service systems?',
    description: 'Consider your citizen-facing digital services, internal government systems, and inter-agency technology integration. For Example: Can citizens complete most government services online (permits, tax filing, benefit applications), or do most processes still require in-person visits and paper forms?',
    options: [
      {
        value: 1,
        text: 'Mostly paper-based processes',
        description: 'Limited digital services with manual, paper-based citizen interactions'
      },
      {
        value: 2,
        text: 'Basic digital government services',
        description: 'Some online services but many processes still require in-person visits'
      },
      {
        value: 3,
        text: 'Moderate digital government platform',
        description: 'Good foundation of online services with improving citizen experience'
      },
      {
        value: 4,
        text: 'Advanced digital government',
        description: 'Comprehensive online services with streamlined citizen interactions'
      },
      {
        value: 5,
        text: 'AI-ready government technology',
        description: 'Fully integrated digital platform optimized for intelligent citizen services'
      }
    ]
  },
  {
    industry: 'Government',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing citizen records, agency data, and regulatory compliance?',
    description: 'Consider data accuracy, inter-agency data sharing, and compliance with government data regulations. For Example: Can different departments easily and securely share citizen information when needed, or do agencies maintain separate databases that don\'t communicate with each other?',
    options: [
      {
        value: 1,
        text: 'Fragmented agency data systems',
        description: 'Isolated data systems with limited inter-agency coordination'
      },
      {
        value: 2,
        text: 'Basic government data standards',
        description: 'Some standardization but inconsistent data sharing practices'
      },
      {
        value: 3,
        text: 'Coordinated government data governance',
        description: 'Good data standards with developing inter-agency collaboration'
      },
      {
        value: 4,
        text: 'Integrated government data systems',
        description: 'Strong data governance with effective inter-agency data sharing'
      },
      {
        value: 5,
        text: 'Advanced government data platform',
        description: 'Comprehensive data governance optimized for citizen services and policy insights'
      }
    ]
  },
  {
    industry: 'Government',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of digital government and public sector AI knowledge among your staff and leadership?',
    description: 'Assess understanding of digital transformation, automated citizen services, and AI applications in government. For Example: Do your teams understand how AI could streamline permit approvals, improve service delivery, or analyze policy impacts, or is their expertise mainly in traditional government operations?',
    options: [
      {
        value: 1,
        text: 'Traditional government operations focus',
        description: 'Strong public administration skills but limited digital government knowledge'
      },
      {
        value: 2,
        text: 'Basic digital government awareness',
        description: 'Familiar with basic digital services but limited AI applications understanding'
      },
      {
        value: 3,
        text: 'Moderate digital transformation literacy',
        description: 'Good understanding of digital government with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced public sector technology skills',
        description: 'Strong digital government background with AI implementation experience'
      },
      {
        value: 5,
        text: 'Government AI expertise',
        description: 'Deep knowledge of AI applications in citizen services, policy analysis, and public administration'
      }
    ]
  },
  {
    industry: 'Government',
    questionId: 'systemIntegration_1',
    question: 'How well integrated are your citizen services, inter-agency systems, and data sharing capabilities?',
    description: 'Evaluate integration between citizen-facing services, internal government systems, and cross-agency collaboration platforms. For Example: When a citizen moves and updates their address, does this automatically update across all relevant agencies (DMV, voter registration, tax records), or does each agency require separate notification?',
    options: [
      {
        value: 1,
        text: 'Isolated agency systems',
        description: 'Separate systems with minimal inter-agency coordination'
      },
      {
        value: 2,
        text: 'Basic government system connections',
        description: 'Some integration but limited real-time data sharing'
      },
      {
        value: 3,
        text: 'Moderate inter-agency integration',
        description: 'Good integration between core government services'
      },
      {
        value: 4,
        text: 'Advanced government ecosystem',
        description: 'Strong integration across agencies with streamlined citizen services'
      },
      {
        value: 5,
        text: 'Seamless digital government',
        description: 'Complete integration optimized for efficient public service delivery'
      }
    ]
  }
];

// Non-profit-specific question variations
export const nonprofitVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Non-profit',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your organization\'s technology systems for donor management, program delivery, and impact tracking?',
    description: 'Consider your fundraising platforms, volunteer management systems, and program monitoring tools. For Example: Can you easily track a donor\'s giving history, volunteer contributions, and program impact in one system, or do you manage these activities through separate, disconnected tools?',
    options: [
      {
        value: 1,
        text: 'Basic non-profit tools',
        description: 'Simple fundraising and volunteer management with limited integration'
      },
      {
        value: 2,
        text: 'Standard non-profit platform',
        description: 'Good donor management with developing program tracking capabilities'
      },
      {
        value: 3,
        text: 'Integrated mission-driven technology',
        description: 'Well-connected systems for donors, volunteers, and program management'
      },
      {
        value: 4,
        text: 'Advanced non-profit ecosystem',
        description: 'Comprehensive platform for fundraising, programs, and impact measurement'
      },
      {
        value: 5,
        text: 'AI-ready social impact platform',
        description: 'Fully integrated system optimized for data-driven social impact and donor engagement'
      }
    ]
  },
  {
    industry: 'Non-profit',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing donor information, program data, and impact measurement?',
    description: 'Consider data accuracy, privacy compliance, and program effectiveness tracking. For Example: Do you have clean, organized data about donor relationships, program outcomes, and beneficiary impact that helps you make informed decisions about your mission?',
    options: [
      {
        value: 1,
        text: 'Basic record keeping',
        description: 'Simple donor and program records without comprehensive tracking'
      },
      {
        value: 2,
        text: 'Developing data practices',
        description: 'Good donor data but limited program outcome measurement'
      },
      {
        value: 3,
        text: 'Structured non-profit data management',
        description: 'Solid data governance with effective donor and program tracking'
      },
      {
        value: 4,
        text: 'Advanced impact data systems',
        description: 'Comprehensive data governance optimized for measuring social impact'
      },
      {
        value: 5,
        text: 'Data-driven social impact platform',
        description: 'Excellent data management designed for maximizing mission effectiveness and donor stewardship'
      }
    ]
  },
  {
    industry: 'Non-profit',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of fundraising technology and social impact AI knowledge among your staff and volunteers?',
    description: 'Assess understanding of donor analytics, program optimization, and AI applications in non-profit work. For Example: Do your teams understand how AI could help identify major donor prospects, predict fundraising outcomes, or analyze program effectiveness to maximize social impact?',
    options: [
      {
        value: 1,
        text: 'Traditional non-profit skills',
        description: 'Strong mission focus but limited technology and data analysis knowledge'
      },
      {
        value: 2,
        text: 'Basic fundraising technology awareness',
        description: 'Comfortable with donor management systems but limited AI understanding'
      },
      {
        value: 3,
        text: 'Moderate non-profit tech literacy',
        description: 'Good understanding of fundraising technology with growing data interest'
      },
      {
        value: 4,
        text: 'Advanced social impact technology skills',
        description: 'Strong non-profit technology background with data analysis experience'
      },
      {
        value: 5,
        text: 'Non-profit AI expertise',
        description: 'Deep knowledge of AI applications in fundraising, program optimization, and impact measurement'
      }
    ]
  }
];

// Consulting-specific question variations
export const consultingVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Consulting',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your consulting firm\'s technology systems for client management, knowledge sharing, and project delivery?',
    description: 'Consider your client relationship management, knowledge management systems, and project collaboration tools. For Example: Can your consultants easily access past project insights, client history, and best practices when starting new engagements, or is institutional knowledge scattered across different systems and individual files?',
    options: [
      {
        value: 1,
        text: 'Basic consulting tools',
        description: 'Simple project management with limited knowledge sharing capabilities'
      },
      {
        value: 2,
        text: 'Standard professional services platform',
        description: 'Good client management with developing knowledge systems'
      },
      {
        value: 3,
        text: 'Integrated consulting technology',
        description: 'Well-connected systems for clients, projects, and knowledge management'
      },
      {
        value: 4,
        text: 'Advanced consulting ecosystem',
        description: 'Comprehensive platform for client engagement and intellectual capital management'
      },
      {
        value: 5,
        text: 'AI-powered consulting platform',
        description: 'Fully integrated system optimized for knowledge leverage and client insight delivery'
      }
    ]
  },
  {
    industry: 'Consulting',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing client information, project knowledge, and intellectual property?',
    description: 'Consider data security, knowledge organization, and client confidentiality requirements. For Example: Do you have secure, well-organized systems that protect client confidentiality while allowing consultants to learn from past engagements and build on previous work?',
    options: [
      {
        value: 1,
        text: 'Basic client data management',
        description: 'Simple client records without comprehensive knowledge capture'
      },
      {
        value: 2,
        text: 'Developing knowledge management',
        description: 'Good client data but limited institutional knowledge organization'
      },
      {
        value: 3,
        text: 'Structured consulting data governance',
        description: 'Solid data practices with effective client and project knowledge management'
      },
      {
        value: 4,
        text: 'Advanced knowledge systems',
        description: 'Comprehensive data governance optimized for intellectual capital development'
      },
      {
        value: 5,
        text: 'AI-optimized consulting intelligence',
        description: 'Excellent data management designed for leveraging insights and accelerating client value delivery'
      }
    ]
  },
  {
    industry: 'Consulting',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of business intelligence and consulting AI knowledge among your consultants and partners?',
    description: 'Assess understanding of data analytics, client insight generation, and AI applications in consulting. For Example: Do your consultants understand how AI could accelerate market research, identify client patterns, or generate strategic recommendations from data analysis?',
    options: [
      {
        value: 1,
        text: 'Traditional consulting skills',
        description: 'Strong analytical and client skills but limited AI and data science knowledge'
      },
      {
        value: 2,
        text: 'Basic business analytics awareness',
        description: 'Comfortable with standard analysis tools but limited AI applications understanding'
      },
      {
        value: 3,
        text: 'Moderate consulting tech literacy',
        description: 'Good understanding of data analysis with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced consulting technology skills',
        description: 'Strong data analytics background with AI implementation experience'
      },
      {
        value: 5,
        text: 'Consulting AI expertise',
        description: 'Deep knowledge of AI applications in strategy, operations, and client insight generation'
      }
    ]
  }
];

// Media & Entertainment-specific question variations
export const mediaVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Media',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your media technology systems for content creation, distribution, and audience engagement?',
    description: 'Consider your content management systems, digital publishing platforms, and audience analytics tools. For Example: Can you track how your content performs across different channels (website, social media, streaming platforms), or do you manage content distribution through separate, disconnected systems?',
    options: [
      {
        value: 1,
        text: 'Basic content management',
        description: 'Simple publishing tools with limited multi-channel distribution'
      },
      {
        value: 2,
        text: 'Standard media platform',
        description: 'Good content management with developing audience analytics'
      },
      {
        value: 3,
        text: 'Integrated media technology',
        description: 'Well-connected systems for content creation, distribution, and engagement'
      },
      {
        value: 4,
        text: 'Advanced media ecosystem',
        description: 'Comprehensive platform for multi-channel content delivery and audience insights'
      },
      {
        value: 5,
        text: 'AI-powered media platform',
        description: 'Fully integrated system optimized for personalized content and audience engagement'
      }
    ]
  },
  {
    industry: 'Media',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing audience data, content performance, and engagement metrics?',
    description: 'Consider data accuracy, content analytics, and audience privacy compliance. For Example: Do you have comprehensive, organized data about audience behavior, content engagement, and performance metrics that helps you create better content and grow your audience?',
    options: [
      {
        value: 1,
        text: 'Basic content metrics',
        description: 'Simple page views and basic analytics without comprehensive audience insights'
      },
      {
        value: 2,
        text: 'Standard audience analytics',
        description: 'Good engagement data but fragmented across different platforms'
      },
      {
        value: 3,
        text: 'Integrated media data management',
        description: 'Solid data governance with unified audience and content analytics'
      },
      {
        value: 4,
        text: 'Advanced content intelligence',
        description: 'Comprehensive data systems optimized for audience understanding and content optimization'
      },
      {
        value: 5,
        text: 'AI-driven media data platform',
        description: 'Excellent data management designed for personalized content delivery and audience growth'
      }
    ]
  },
  {
    industry: 'Media',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of digital media and content AI knowledge among your content creators and marketing teams?',
    description: 'Assess understanding of audience analytics, content optimization, and AI applications in media. For Example: Do your teams understand how AI could personalize content recommendations, automate content tagging, or optimize publishing schedules based on audience behavior?',
    options: [
      {
        value: 1,
        text: 'Traditional media skills',
        description: 'Strong creative and editorial skills but limited digital analytics knowledge'
      },
      {
        value: 2,
        text: 'Basic digital media awareness',
        description: 'Comfortable with publishing platforms but limited AI applications understanding'
      },
      {
        value: 3,
        text: 'Moderate digital media literacy',
        description: 'Good understanding of audience analytics with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced media technology skills',
        description: 'Strong digital media background with data-driven content experience'
      },
      {
        value: 5,
        text: 'Media AI expertise',
        description: 'Deep knowledge of AI applications in content creation, audience engagement, and distribution optimization'
      }
    ]
  }
];

// Real Estate-specific question variations
export const realEstateVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Real Estate',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your real estate technology systems for property management, client relationships, and market analysis?',
    description: 'Consider your property listing systems, customer relationship management, and market analysis tools. For Example: Can you automatically track property values, client preferences, and market trends in one system, or do you manage listings, clients, and market data through separate tools?',
    options: [
      {
        value: 1,
        text: 'Basic property management tools',
        description: 'Simple listing management with limited client and market integration'
      },
      {
        value: 2,
        text: 'Standard real estate platform',
        description: 'Good property management with developing client relationship tools'
      },
      {
        value: 3,
        text: 'Integrated real estate technology',
        description: 'Well-connected systems for properties, clients, and basic market analysis'
      },
      {
        value: 4,
        text: 'Advanced real estate ecosystem',
        description: 'Comprehensive platform for property management, client engagement, and market insights'
      },
      {
        value: 5,
        text: 'AI-powered real estate platform',
        description: 'Fully integrated system optimized for predictive market analysis and automated client matching'
      }
    ]
  },
  {
    industry: 'Real Estate',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing property data, client information, and market intelligence?',
    description: 'Consider data accuracy, market data integration, and client privacy compliance. For Example: Do you have clean, organized data about property histories, client preferences, and market trends that helps you make informed pricing and investment decisions?',
    options: [
      {
        value: 1,
        text: 'Basic property records',
        description: 'Simple property listings without comprehensive market or client insights'
      },
      {
        value: 2,
        text: 'Standard real estate data',
        description: 'Good property data but limited market analysis and client intelligence'
      },
      {
        value: 3,
        text: 'Integrated real estate data management',
        description: 'Solid data governance with effective property, client, and market tracking'
      },
      {
        value: 4,
        text: 'Advanced market intelligence systems',
        description: 'Comprehensive data governance optimized for market analysis and client insights'
      },
      {
        value: 5,
        text: 'AI-optimized real estate data',
        description: 'Excellent data management designed for predictive market analysis and personalized client service'
      }
    ]
  },
  {
    industry: 'Real Estate',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of property technology and real estate AI knowledge among your agents and staff?',
    description: 'Assess understanding of market analytics, client matching systems, and AI applications in real estate. For Example: Do your teams understand how AI could predict property values, match clients with ideal properties, or identify investment opportunities based on market trends?',
    options: [
      {
        value: 1,
        text: 'Traditional real estate skills',
        description: 'Strong sales and property knowledge but limited technology and data analysis experience'
      },
      {
        value: 2,
        text: 'Basic real estate technology awareness',
        description: 'Comfortable with listing platforms but limited AI applications understanding'
      },
      {
        value: 3,
        text: 'Moderate real estate tech literacy',
        description: 'Good understanding of property technology with growing data analysis interest'
      },
      {
        value: 4,
        text: 'Advanced real estate technology skills',
        description: 'Strong property technology background with market analysis experience'
      },
      {
        value: 5,
        text: 'Real estate AI expertise',
        description: 'Deep knowledge of AI applications in property valuation, client matching, and market prediction'
      }
    ]
  }
];

// Transportation & Logistics-specific question variations
export const transportationVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Transportation',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your transportation technology systems for fleet management, route optimization, and shipment tracking?',
    description: 'Consider your fleet management systems, logistics platforms, and real-time tracking capabilities. For Example: Can you track vehicles in real-time, automatically optimize delivery routes, and provide customers with accurate shipment updates, or do you manage these processes manually?',
    options: [
      {
        value: 1,
        text: 'Basic transportation management',
        description: 'Simple scheduling and tracking with limited automation'
      },
      {
        value: 2,
        text: 'Standard logistics platform',
        description: 'Good fleet tracking with developing route optimization'
      },
      {
        value: 3,
        text: 'Integrated transportation technology',
        description: 'Well-connected systems for fleet, routes, and shipment management'
      },
      {
        value: 4,
        text: 'Advanced logistics ecosystem',
        description: 'Comprehensive platform for automated fleet management and route optimization'
      },
      {
        value: 5,
        text: 'AI-powered logistics platform',
        description: 'Fully integrated system optimized for predictive logistics and autonomous operation'
      }
    ]
  },
  {
    industry: 'Transportation',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing fleet data, route information, and logistics performance?',
    description: 'Consider data accuracy, operational efficiency tracking, and regulatory compliance. For Example: Do you have comprehensive, organized data about vehicle performance, delivery times, and operational costs that helps you optimize routes and reduce expenses?',
    options: [
      {
        value: 1,
        text: 'Basic operational logs',
        description: 'Simple delivery records without comprehensive fleet or performance insights'
      },
      {
        value: 2,
        text: 'Standard logistics data',
        description: 'Good tracking data but limited operational optimization insights'
      },
      {
        value: 3,
        text: 'Integrated transportation data management',
        description: 'Solid data governance with effective fleet and route performance tracking'
      },
      {
        value: 4,
        text: 'Advanced logistics intelligence',
        description: 'Comprehensive data systems optimized for operational efficiency and cost reduction'
      },
      {
        value: 5,
        text: 'AI-optimized logistics data',
        description: 'Excellent data management designed for predictive maintenance and autonomous logistics optimization'
      }
    ]
  },
  {
    industry: 'Transportation',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of logistics technology and transportation AI knowledge among your operations and management teams?',
    description: 'Assess understanding of fleet optimization, predictive maintenance, and AI applications in logistics. For Example: Do your teams understand how AI could predict vehicle maintenance needs, optimize delivery routes in real-time, or automate warehouse operations?',
    options: [
      {
        value: 1,
        text: 'Traditional logistics skills',
        description: 'Strong operational and driving skills but limited technology and automation knowledge'
      },
      {
        value: 2,
        text: 'Basic logistics technology awareness',
        description: 'Comfortable with tracking systems but limited AI applications understanding'
      },
      {
        value: 3,
        text: 'Moderate transportation tech literacy',
        description: 'Good understanding of logistics technology with growing automation interest'
      },
      {
        value: 4,
        text: 'Advanced transportation technology skills',
        description: 'Strong logistics technology background with fleet optimization experience'
      },
      {
        value: 5,
        text: 'Transportation AI expertise',
        description: 'Deep knowledge of AI applications in fleet management, route optimization, and predictive logistics'
      }
    ]
  }
];

// Energy & Utilities-specific question variations
export const energyVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Energy',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your energy technology systems for grid management, asset monitoring, and customer service?',
    description: 'Consider your grid control systems, smart meters, and infrastructure monitoring tools. For Example: Can you monitor energy consumption and grid performance in real-time, predict equipment failures, and provide customers with detailed usage insights, or do you rely mainly on manual inspections and basic metering?',
    options: [
      {
        value: 1,
        text: 'Traditional energy infrastructure',
        description: 'Basic grid management with limited smart monitoring capabilities'
      },
      {
        value: 2,
        text: 'Emerging smart grid deployment',
        description: 'Some smart meters and monitoring with developing analytics'
      },
      {
        value: 3,
        text: 'Moderate smart energy systems',
        description: 'Good smart grid foundation with growing predictive capabilities'
      },
      {
        value: 4,
        text: 'Advanced smart grid technology',
        description: 'Comprehensive smart infrastructure with real-time monitoring and control'
      },
      {
        value: 5,
        text: 'AI-powered energy platform',
        description: 'Fully integrated smart grid optimized for autonomous operation and predictive management'
      }
    ]
  },
  {
    industry: 'Energy',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing grid data, consumption patterns, and infrastructure performance?',
    description: 'Consider data accuracy, regulatory compliance, and operational efficiency tracking. For Example: Do you have comprehensive, real-time data about energy production, consumption patterns, and equipment performance that helps you optimize grid operations and prevent outages?',
    options: [
      {
        value: 1,
        text: 'Basic energy records',
        description: 'Simple consumption data without comprehensive grid or performance insights'
      },
      {
        value: 2,
        text: 'Standard utility data management',
        description: 'Good metering data but limited grid optimization insights'
      },
      {
        value: 3,
        text: 'Integrated energy data governance',
        description: 'Solid data practices with effective grid and consumption monitoring'
      },
      {
        value: 4,
        text: 'Advanced grid intelligence systems',
        description: 'Comprehensive data governance optimized for grid optimization and predictive maintenance'
      },
      {
        value: 5,
        text: 'AI-optimized energy data',
        description: 'Excellent data management designed for autonomous grid operation and renewable energy integration'
      }
    ]
  },
  {
    industry: 'Energy',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of smart grid and energy AI knowledge among your operations and engineering teams?',
    description: 'Assess understanding of grid optimization, predictive maintenance, and AI applications in energy management. For Example: Do your teams understand how AI could optimize renewable energy integration, predict equipment failures, or automatically balance grid loads based on demand patterns?',
    options: [
      {
        value: 1,
        text: 'Traditional energy engineering skills',
        description: 'Strong electrical and mechanical knowledge but limited smart grid and AI understanding'
      },
      {
        value: 2,
        text: 'Basic smart grid awareness',
        description: 'Familiar with smart meters and basic automation but limited AI applications knowledge'
      },
      {
        value: 3,
        text: 'Moderate energy technology literacy',
        description: 'Good understanding of smart grid technology with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced energy technology skills',
        description: 'Strong smart grid background with predictive analytics experience'
      },
      {
        value: 5,
        text: 'Energy AI expertise',
        description: 'Deep knowledge of AI applications in grid optimization, renewable integration, and predictive maintenance'
      }
    ]
  }
];

// Agriculture & Food-specific question variations
export const agricultureVariations: IndustryQuestionVariation[] = [
  {
    industry: 'Agriculture',
    questionId: 'technologyInfrastructure_1',
    question: 'How would you describe your agricultural technology systems for crop monitoring, farm management, and supply chain integration?',
    description: 'Consider your precision agriculture tools, farm management software, and food safety tracking systems. For Example: Can you monitor soil conditions, crop health, and harvest timing using connected sensors and data analytics, or do you rely mainly on traditional farming methods and manual monitoring?',
    options: [
      {
        value: 1,
        text: 'Traditional farming methods',
        description: 'Basic farm equipment with limited digital monitoring or data collection'
      },
      {
        value: 2,
        text: 'Emerging precision agriculture',
        description: 'Some connected equipment and basic farm management software'
      },
      {
        value: 3,
        text: 'Moderate smart farming adoption',
        description: 'Good foundation of agricultural technology with developing analytics capabilities'
      },
      {
        value: 4,
        text: 'Advanced precision agriculture',
        description: 'Comprehensive smart farming with real-time monitoring and automated systems'
      },
      {
        value: 5,
        text: 'AI-powered agricultural platform',
        description: 'Fully integrated smart farming optimized for autonomous operation and predictive agriculture'
      }
    ]
  },
  {
    industry: 'Agriculture',
    questionId: 'dataQuality_1',
    question: 'How would you describe the current state of your data governance framework for managing crop data, soil conditions, and production metrics?',
    description: 'Consider data accuracy, food safety compliance, and operational efficiency tracking. For Example: Do you have comprehensive, organized data about soil health, crop yields, and weather patterns that helps you optimize planting decisions and maximize harvest quality?',
    options: [
      {
        value: 1,
        text: 'Basic farm records',
        description: 'Simple production logs without comprehensive crop or soil insights'
      },
      {
        value: 2,
        text: 'Standard agricultural data',
        description: 'Good harvest data but limited soil and crop optimization insights'
      },
      {
        value: 3,
        text: 'Integrated farm data management',
        description: 'Solid data governance with effective crop and soil monitoring'
      },
      {
        value: 4,
        text: 'Advanced agricultural intelligence',
        description: 'Comprehensive data systems optimized for crop optimization and yield prediction'
      },
      {
        value: 5,
        text: 'AI-optimized agricultural data',
        description: 'Excellent data management designed for precision agriculture and autonomous farming decisions'
      }
    ]
  },
  {
    industry: 'Agriculture',
    questionId: 'teamLiteracy_1',
    question: 'What is the level of precision agriculture and farming AI knowledge among your farming and management teams?',
    description: 'Assess understanding of smart farming, crop analytics, and AI applications in agriculture. For Example: Do your teams understand how AI could predict optimal planting times, identify crop diseases early, or optimize irrigation based on soil and weather data?',
    options: [
      {
        value: 1,
        text: 'Traditional farming expertise',
        description: 'Strong agricultural and crop knowledge but limited technology and data analysis experience'
      },
      {
        value: 2,
        text: 'Basic agricultural technology awareness',
        description: 'Comfortable with farm equipment but limited AI applications understanding'
      },
      {
        value: 3,
        text: 'Moderate precision agriculture literacy',
        description: 'Good understanding of smart farming with growing data analysis interest'
      },
      {
        value: 4,
        text: 'Advanced agricultural technology skills',
        description: 'Strong precision agriculture background with crop analytics experience'
      },
      {
        value: 5,
        text: 'Agricultural AI expertise',
        description: 'Deep knowledge of AI applications in crop optimization, yield prediction, and automated farming'
      }
    ]
  }
];

// Function to get all supported industries
export function getSupportedIndustries(): string[] {
  return ['Healthcare', 'Manufacturing', 'Finance', 'Retail', 'Education', 'Technology', 'Government', 'Non-profit', 'Consulting', 'Media', 'Real Estate', 'Transportation', 'Energy', 'Agriculture'];
}

// Function to check if industry has specific variations
export function hasIndustryVariations(industry: string): boolean {
  return getSupportedIndustries().includes(industry);
}
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
    description: 'Consider your electronic health records, medical device connectivity, and healthcare-specific IT systems.',
    options: [
      {
        value: 1,
        text: 'Basic EHR with limited integration',
        description: 'Standalone electronic health record system with minimal device connectivity'
      },
      {
        value: 2,
        text: 'Moderate EHR with some device integration',
        description: 'Good EHR foundation with basic medical device connectivity'
      },
      {
        value: 3,
        text: 'Integrated healthcare IT platform',
        description: 'Well-connected EHR with most medical devices and systems integrated'
      },
      {
        value: 4,
        text: 'Advanced healthcare IT ecosystem',
        description: 'Comprehensive integration of EHR, medical devices, and clinical systems'
      },
      {
        value: 5,
        text: 'AI-ready healthcare technology',
        description: 'Fully integrated platform optimized for AI-powered clinical analytics'
      }
    ]
  },
  {
    industry: 'Healthcare',
    questionId: 'dataQuality_1',
    question: 'How would you describe the quality of your patient data and clinical records?',
    description: 'Consider data accuracy, completeness, and compliance with healthcare standards like HL7 FHIR.',
    options: [
      {
        value: 1,
        text: 'Poor data quality with compliance issues',
        description: 'Significant issues with patient data accuracy and regulatory compliance'
      },
      {
        value: 2,
        text: 'Inconsistent clinical data quality',
        description: 'Some clinical data is good, but quality varies across departments'
      },
      {
        value: 3,
        text: 'HIPAA-compliant with moderate quality',
        description: 'Generally reliable clinical data with basic compliance measures'
      },
      {
        value: 4,
        text: 'High-quality EHR with strong governance',
        description: 'Well-structured electronic health records with established standards'
      },
      {
        value: 5,
        text: 'Excellent clinical data with advanced analytics',
        description: 'Consistently high-quality patient data optimized for clinical insights'
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
        text: 'Limited budget ($25K - $100K)',
        description: 'Small budget for basic clinical AI tools or pilot programs'
      },
      {
        value: 3,
        text: 'Moderate healthcare AI budget ($100K - $500K)',
        description: 'Adequate funding for meaningful clinical AI implementation'
      },
      {
        value: 4,
        text: 'Substantial healthcare investment ($500K - $2M)',
        description: 'Strong budget for comprehensive clinical AI initiatives'
      },
      {
        value: 5,
        text: 'Major digital health transformation ($2M+)',
        description: 'Significant investment for extensive healthcare AI and digital health transformation'
      }
    ]
  },
  {
    industry: 'Healthcare',
    questionId: 'dataSecurity_1',
    question: 'How robust are your HIPAA compliance and patient data security measures?',
    description: 'Assess your organization\'s ability to protect patient health information and meet regulatory requirements.',
    options: [
      {
        value: 1,
        text: 'Basic HIPAA compliance',
        description: 'Minimal security measures with potential compliance gaps'
      },
      {
        value: 2,
        text: 'Standard healthcare security',
        description: 'Basic HIPAA compliance but limited advanced security measures'
      },
      {
        value: 3,
        text: 'Good healthcare security framework',
        description: 'Solid HIPAA compliance with established security protocols'
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
    description: 'Consider your industrial networks, edge computing capabilities, and smart manufacturing systems.',
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
    question: 'What is your current industrial IoT and sensor data processing capacity?',
    description: 'Evaluate your ability to handle real-time manufacturing data and sensor feeds.',
    options: [
      {
        value: 1,
        text: 'Limited connected devices',
        description: 'Few connected devices with basic data collection'
      },
      {
        value: 2,
        text: 'Basic IoT deployment',
        description: 'Some connected equipment but limited data processing'
      },
      {
        value: 3,
        text: 'Moderate Industry 4.0 adoption',
        description: 'Good sensor coverage with developing analytics capabilities'
      },
      {
        value: 4,
        text: 'Advanced smart manufacturing',
        description: 'Comprehensive IoT with real-time analytics and automation'
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
    question: 'What is the level of Industry 4.0 and manufacturing AI knowledge among your operations and engineering teams?',
    description: 'Assess understanding of smart manufacturing, predictive maintenance, and AI-driven production optimization.',
    options: [
      {
        value: 1,
        text: 'Traditional manufacturing skills',
        description: 'Strong mechanical skills but limited digital manufacturing knowledge'
      },
      {
        value: 2,
        text: 'Basic automation experience',
        description: 'Familiar with PLCs and basic automation but limited AI understanding'
      },
      {
        value: 3,
        text: 'Moderate Industry 4.0 awareness',
        description: 'Good understanding of smart manufacturing concepts with some practical experience'
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
    description: 'Evaluate integration between MES, ERP, quality systems, and supplier networks.',
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
    description: 'Consider production data, sensor readings, and quality metrics readiness for AI analysis.',
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
    description: 'Consider your core banking systems, trading platforms, and real-time transaction processing capacity.',
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
    question: 'What is the level of fintech and financial AI knowledge among your teams?',
    description: 'Assess understanding of algorithmic trading, robo-advisors, and AI-powered risk management.',
    options: [
      {
        value: 1,
        text: 'Traditional finance skills',
        description: 'Strong financial knowledge but limited fintech or AI understanding'
      },
      {
        value: 2,
        text: 'Basic fintech awareness',
        description: 'Familiar with digital banking but limited AI applications knowledge'
      },
      {
        value: 3,
        text: 'Moderate financial technology literacy',
        description: 'Good understanding of fintech with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced fintech skills',
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
    description: 'Assess compliance with regulations like SOX, PCI DSS, and other financial security requirements.',
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
    description: 'Consider transaction data, customer information, and risk metrics readiness for AI analysis.',
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
    description: 'Consider your e-commerce platform, POS systems, inventory management, and customer data integration.',
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
    description: 'Assess understanding of personalization engines, demand forecasting, and customer analytics.',
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
    description: 'Consider customer behavior data, inventory data, and sales metrics readiness for AI analysis.',
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
    description: 'Assess the integration between online/offline channels, inventory management, and customer data systems.',
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
    description: 'Consider your LMS, student information systems, and digital learning platform capabilities.',
    options: [
      {
        value: 1,
        text: 'Basic educational IT',
        description: 'Traditional systems with limited digital learning capabilities'
      },
      {
        value: 2,
        text: 'Developing EdTech platform',
        description: 'Good LMS foundation with emerging digital learning tools'
      },
      {
        value: 3,
        text: 'Integrated learning ecosystem',
        description: 'Well-connected educational systems with comprehensive digital learning'
      },
      {
        value: 4,
        text: 'Advanced EdTech systems',
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
    description: 'Evaluate integration between SIS, LMS, assessment tools, and communication systems.',
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
    description: 'Consider investments in adaptive learning, student analytics, and educational AI tools.',
    options: [
      {
        value: 1,
        text: 'No specific EdTech AI budget',
        description: 'Educational technology would need to be funded from general IT budget'
      },
      {
        value: 2,
        text: 'Limited EdTech budget ($15K - $75K)',
        description: 'Small budget for basic educational AI tools or pilot programs'
      },
      {
        value: 3,
        text: 'Moderate learning technology budget ($75K - $300K)',
        description: 'Adequate funding for meaningful educational AI implementation'
      },
      {
        value: 4,
        text: 'Substantial educational investment ($300K - $1M)',
        description: 'Strong budget for comprehensive learning analytics and AI initiatives'
      },
      {
        value: 5,
        text: 'Major digital learning transformation ($1M+)',
        description: 'Significant investment for extensive educational AI and adaptive learning systems'
      }
    ]
  },
  {
    industry: 'Education',
    questionId: 'dataQuality_1',
    question: 'How would you describe the quality of your student data and learning analytics?',
    description: 'Consider student information systems, learning management data, and academic performance metrics.',
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
    description: 'Assess understanding of AI applications in education and digital learning tools.',
    options: [
      {
        value: 1,
        text: 'Limited educational technology knowledge',
        description: 'Basic computer skills with minimal AI awareness'
      },
      {
        value: 2,
        text: 'Basic digital learning tools usage',
        description: 'Comfortable with LMS but limited AI understanding'
      },
      {
        value: 3,
        text: 'Moderate edtech proficiency',
        description: 'Good digital tools usage with growing AI interest'
      },
      {
        value: 4,
        text: 'Advanced educational technology skills',
        description: 'Strong edtech background with AI implementation experience'
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
    ...technologyVariations
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
    description: 'Consider how modern and automated your software development and release processes are.',
    options: [
      {
        value: 1,
        text: 'Traditional development environment',
        description: 'Monolithic architecture with basic deployment processes'
      },
      {
        value: 2,
        text: 'Modernizing tech stack',
        description: 'Transitioning to cloud with developing DevOps practices'
      },
      {
        value: 3,
        text: 'Cloud-native architecture',
        description: 'Good modern software architecture with automated deployment'
      },
      {
        value: 4,
        text: 'Advanced DevOps ecosystem',
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
    description: 'Assess understanding of ML frameworks, AI model deployment, and data science practices.',
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
        text: 'Moderate ML proficiency',
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
    description: 'Consider data from user interactions, product analytics, system logs, and business metrics.',
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

// Function to get all supported industries
export function getSupportedIndustries(): string[] {
  return ['Healthcare', 'Manufacturing', 'Finance', 'Retail', 'Education', 'Technology'];
}

// Function to check if industry has specific variations
export function hasIndustryVariations(industry: string): boolean {
  return getSupportedIndustries().includes(industry);
}
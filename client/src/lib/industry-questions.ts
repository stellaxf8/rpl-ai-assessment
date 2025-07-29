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
    questionId: 'security_1',
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
    questionId: 'technologyInfrastructure_2',
    question: 'What is your current industrial IoT and sensor data processing capacity?',
    description: 'Evaluate your ability to handle real-time manufacturing data and sensor feeds.',
    options: [
      {
        value: 1,
        text: 'Limited IoT infrastructure',
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
    questionId: 'security_1',
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
    ...educationVariations
  ];
  
  return allVariations.find(variation => 
    variation.industry === industry && variation.questionId === questionId
  ) || null;
}

// Function to get all supported industries
export function getSupportedIndustries(): string[] {
  return ['Healthcare', 'Manufacturing', 'Finance', 'Retail', 'Education'];
}

// Function to check if industry has specific variations
export function hasIndustryVariations(industry: string): boolean {
  return getSupportedIndustries().includes(industry);
}
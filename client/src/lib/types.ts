export interface Assessment {
  id: string;
  organizationName: string | null;
  contactEmail: string | null;
  industry: string;
  responses: Record<string, number>;
  scores: Record<string, number>;
  overallScore: number;
  createdAt: Date;
}

export interface DimensionScores {
  technologyInfrastructure: number;
  dataQuality: number;
  teamLiteracy: number;
  systemIntegration: number;
  budget: number;
  dataSecurity: number;
}

export interface AIMaturityRoadmap {
  currentLevel: 'Beginner' | 'Developing' | 'Advancing' | 'Leading';
  targetLevel: 'Developing' | 'Advancing' | 'Leading' | 'Transformative';
  timeline: {
    phase1: { name: string; duration: string; milestones: string[]; resources: string[] };
    phase2: { name: string; duration: string; milestones: string[]; resources: string[] };
    phase3: { name: string; duration: string; milestones: string[]; resources: string[] };
  };
  totalDuration: string;
  estimatedCost: { low: number; high: number };
}

export interface IndustryQuestionSet {
  industry: 'Healthcare' | 'Manufacturing' | 'Retail' | 'Finance' | 'Technology' | 'Education' | 'Government' | 'Non-profit';
  questions: Array<{
    id: string;
    question: string;
    dimension: string;
    industrySpecific: boolean;
  }>;
}

export interface SmartRecommendations {
  organizationSize: 'Small (1-50)' | 'Medium (51-250)' | 'Large (251-1000)' | 'Enterprise (1000+)';
  budget: 'Under $50K' | '$50K-$250K' | '$250K-$1M' | '$1M+';
  recommendations: Array<{
    category: string;
    priority: 'High' | 'Medium' | 'Low';
    title: string;
    description: string;
    estimatedCost: string;
    timeline: string;
    prerequisites: string[];
  }>;
}

export interface LearningPath {
  userId: string;
  currentLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  completedModules: string[];
  recommendedNext: Array<{
    moduleId: string;
    title: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
    type: 'Concept' | 'Guide' | 'Case Study' | 'Interactive';
  }>;
  progressPercentage: number;
}

export interface TrendAnalysis {
  trends: Array<{
    id: string;
    title: string;
    category: 'Technology' | 'Market' | 'Regulation' | 'Application';
    impact: 'High' | 'Medium' | 'Low';
    timeframe: 'Immediate' | '6 months' | '1 year' | '2+ years';
    description: string;
    relevanceScore: number;
    industries: string[];
  }>;
  lastUpdated: string;
}

export interface RegulatoryComplianceTracker {
  regulations: Array<{
    id: string;
    name: string;
    region: string;
    status: 'Active' | 'Proposed' | 'Under Review' | 'Upcoming';
    effectiveDate: string;
    description: string;
    requirements: string[];
    relevantIndustries: string[];
    complianceLevel: 'Critical' | 'Important' | 'Recommended';
  }>;
  lastUpdated: string;
}

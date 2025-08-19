import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationName: text("organization_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  industry: text("industry").notNull(),
  responses: jsonb("responses").notNull(),
  scores: jsonb("scores").notNull(),
  overallScore: integer("overall_score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

// Dimension scores schema - 6 core dimensions for MVP
export const dimensionScoresSchema = z.object({
  technologyInfrastructure: z.number().min(0).max(5),
  dataQuality: z.number().min(0).max(5),
  teamLiteracy: z.number().min(0).max(5),
  systemIntegration: z.number().min(0).max(5),
  budget: z.number().min(0).max(5),
  dataSecurity: z.number().min(0).max(5),
});

export type DimensionScores = z.infer<typeof dimensionScoresSchema>;

// Industry options
export const industryEnum = z.enum([
  'Healthcare',
  'Manufacturing', 
  'Retail',
  'Finance',
  'Technology',
  'Education',
  'Government',
  'Non-profit',
  'Consulting',
  'Media',
  'Real Estate',
  'Transportation',
  'Energy',
  'Agriculture',
  'Other'
]);

export type Industry = z.infer<typeof industryEnum>;

// Assessment responses schema
export const assessmentResponsesSchema = z.record(z.string(), z.number().min(1).max(5));

export type AssessmentResponses = z.infer<typeof assessmentResponsesSchema>;

// Industry benchmarking schema
export const industryBenchmarkSchema = z.object({
  industry: z.string(),
  avgScore: z.number(),
  topPerformerScore: z.number(),
  commonChallenges: z.array(z.string()),
});

export type IndustryBenchmark = z.infer<typeof industryBenchmarkSchema>;

// CRM Integration schemas
export const crmProviderEnum = z.enum([
  'salesforce',
  'hubspot',
  'pipedrive',
  'zoho',
  'none'
]);

export const crmContactSchema = z.object({
  id: z.string(),
  provider: crmProviderEnum,
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email(),
  company: z.string(),
  industry: z.string(),
  assessmentScore: z.number(),
  readinessLevel: z.string(),
  createdAt: z.date(),
  notes: z.string().optional(),
});

export const crmConfigSchema = z.object({
  provider: crmProviderEnum,
  apiKey: z.string().optional(),
  apiUrl: z.string().optional(),
  enabled: z.boolean().default(false),
  webhookUrl: z.string().optional(),
});

export type CrmProvider = z.infer<typeof crmProviderEnum>;
export type CrmContact = z.infer<typeof crmContactSchema>;
export type CrmConfig = z.infer<typeof crmConfigSchema>;

// Integration readiness schema
export const integrationReadinessSchema = z.object({
  crmSystems: z.number().min(0).max(5),
  erpSystems: z.number().min(0).max(5),
  dataWarehouses: z.number().min(0).max(5),
  apiCapabilities: z.number().min(0).max(5),
});

export type IntegrationReadiness = z.infer<typeof integrationReadinessSchema>;

// Compliance assessment schema
export const complianceAssessmentSchema = z.object({
  gdprCompliance: z.number().min(0).max(5),
  hipaaCompliance: z.number().min(0).max(5),
  soxCompliance: z.number().min(0).max(5),
  dataRetentionPolicies: z.number().min(0).max(5),
});

export type ComplianceAssessment = z.infer<typeof complianceAssessmentSchema>;

// AI Maturity Roadmap schema
export const aiMaturityRoadmapSchema = z.object({
  currentLevel: z.enum(['Beginner', 'Developing', 'Advancing', 'Leading']),
  targetLevel: z.enum(['Developing', 'Advancing', 'Leading', 'Transformative']),
  timeline: z.object({
    phase1: z.object({
      name: z.string(),
      duration: z.string(),
      milestones: z.array(z.string()),
      resources: z.array(z.string())
    }),
    phase2: z.object({
      name: z.string(),
      duration: z.string(),
      milestones: z.array(z.string()),
      resources: z.array(z.string())
    }),
    phase3: z.object({
      name: z.string(),
      duration: z.string(),
      milestones: z.array(z.string()),
      resources: z.array(z.string())
    })
  }),
  totalDuration: z.string(),
  estimatedCost: z.object({
    low: z.number(),
    high: z.number()
  })
});

export type AIMaturityRoadmap = z.infer<typeof aiMaturityRoadmapSchema>;

// Industry-specific questions schema
export const industryQuestionSetSchema = z.object({
  industry: z.enum(['Healthcare', 'Manufacturing', 'Retail', 'Finance', 'Technology', 'Education', 'Government', 'Non-profit']),
  questions: z.array(z.object({
    id: z.string(),
    question: z.string(),
    dimension: z.string(),
    industrySpecific: z.boolean()
  }))
});

export type IndustryQuestionSet = z.infer<typeof industryQuestionSetSchema>;

// Smart recommendations schema
export const smartRecommendationsSchema = z.object({
  organizationSize: z.enum(['Small (1-50)', 'Medium (51-250)', 'Large (251-1000)', 'Enterprise (1000+)']),
  budget: z.enum(['Under $50K', '$50K-$250K', '$250K-$1M', '$1M+']),
  recommendations: z.array(z.object({
    category: z.string(),
    priority: z.enum(['High', 'Medium', 'Low']),
    title: z.string(),
    description: z.string(),
    estimatedCost: z.string(),
    timeline: z.string(),
    prerequisites: z.array(z.string())
  }))
});

export type SmartRecommendations = z.infer<typeof smartRecommendationsSchema>;

// Learning path schema
export const learningPathSchema = z.object({
  userId: z.string(),
  currentLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  completedModules: z.array(z.string()),
  recommendedNext: z.array(z.object({
    moduleId: z.string(),
    title: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    estimatedTime: z.string(),
    type: z.enum(['Concept', 'Guide', 'Case Study', 'Interactive'])
  })),
  progressPercentage: z.number().min(0).max(100)
});

export type LearningPath = z.infer<typeof learningPathSchema>;

// Trend analysis schema
export const trendAnalysisSchema = z.object({
  trends: z.array(z.object({
    id: z.string(),
    title: z.string(),
    category: z.enum(['Technology', 'Market', 'Regulation', 'Application']),
    impact: z.enum(['High', 'Medium', 'Low']),
    timeframe: z.enum(['Immediate', '6 months', '1 year', '2+ years']),
    description: z.string(),
    relevanceScore: z.number().min(0).max(100),
    industries: z.array(z.string())
  })),
  lastUpdated: z.string()
});

export type TrendAnalysis = z.infer<typeof trendAnalysisSchema>;

// Regulatory compliance tracker schema
export const regulatoryComplianceTrackerSchema = z.object({
  regulations: z.array(z.object({
    id: z.string(),
    name: z.string(),
    region: z.string(),
    status: z.enum(['Active', 'Proposed', 'Under Review', 'Upcoming']),
    effectiveDate: z.string(),
    description: z.string(),
    requirements: z.array(z.string()),
    relevantIndustries: z.array(z.string()),
    complianceLevel: z.enum(['Critical', 'Important', 'Recommended'])
  })),
  lastUpdated: z.string()
});

export type RegulatoryComplianceTracker = z.infer<typeof regulatoryComplianceTrackerSchema>;

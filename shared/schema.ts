import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationName: text("organization_name").notNull(),
  contactEmail: text("contact_email").notNull(),
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

// Dimension scores schema
export const dimensionScoresSchema = z.object({
  technologyInfrastructure: z.number().min(0).max(5),
  dataQuality: z.number().min(0).max(5),
  teamLiteracy: z.number().min(0).max(5),
  systemIntegration: z.number().min(0).max(5),
  budget: z.number().min(0).max(5),
  security: z.number().min(0).max(5),
});

export type DimensionScores = z.infer<typeof dimensionScoresSchema>;

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

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

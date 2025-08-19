import { type Assessment, type InsertAssessment, assessments } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAssessment(id: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAllAssessments(): Promise<Assessment[]>;
}

export class MemStorage implements IStorage {
  private assessments: Map<string, Assessment>;

  constructor() {
    this.assessments = new Map();
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = randomUUID();
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      createdAt: new Date(),
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }
}

export class DatabaseStorage implements IStorage {
  async getAssessment(id: string): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment || undefined;
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db
      .insert(assessments)
      .values(insertAssessment)
      .returning();
    return assessment;
  }

  async getAllAssessments(): Promise<Assessment[]> {
    return await db.select().from(assessments);
  }
}

// Use database by default since we have PostgreSQL available
const useDatabase = process.env.USE_MEMORY_STORAGE !== 'true';

console.log(`[Storage] Using ${useDatabase ? 'PostgreSQL Database' : 'In-Memory'} storage`);

export const storage = useDatabase ? new DatabaseStorage() : new MemStorage();

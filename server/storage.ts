import { type Assessment, type InsertAssessment, assessments, type EmailRequest, type InsertEmailRequest, emailRequests } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAssessment(id: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAllAssessments(): Promise<Assessment[]>;
  createEmailRequest(emailRequest: InsertEmailRequest): Promise<EmailRequest>;
  getEmailRequestsByAssessment(assessmentId: string): Promise<EmailRequest[]>;
  getAllEmailRequests(): Promise<EmailRequest[]>;
  updateEmailRequestSentStatus(id: string, sentAt: Date): Promise<void>;
}

export class MemStorage implements IStorage {
  private assessments: Map<string, Assessment>;
  private emailRequests: Map<string, EmailRequest>;

  constructor() {
    this.assessments = new Map();
    this.emailRequests = new Map();
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

  async createEmailRequest(insertEmailRequest: InsertEmailRequest): Promise<EmailRequest> {
    const id = randomUUID();
    const emailRequest: EmailRequest = {
      id,
      assessmentId: insertEmailRequest.assessmentId,
      email: insertEmailRequest.email,
      contactConsent: insertEmailRequest.contactConsent || 'false',
      emailSent: insertEmailRequest.emailSent || 'false',
      sentAt: insertEmailRequest.sentAt || null,
      createdAt: new Date(),
    };
    this.emailRequests.set(id, emailRequest);
    return emailRequest;
  }

  async getEmailRequestsByAssessment(assessmentId: string): Promise<EmailRequest[]> {
    return Array.from(this.emailRequests.values()).filter(
      req => req.assessmentId === assessmentId
    );
  }

  async getAllEmailRequests(): Promise<EmailRequest[]> {
    return Array.from(this.emailRequests.values());
  }

  async updateEmailRequestSentStatus(id: string, sentAt: Date): Promise<void> {
    const emailRequest = this.emailRequests.get(id);
    if (emailRequest) {
      emailRequest.emailSent = 'true';
      emailRequest.sentAt = sentAt;
      this.emailRequests.set(id, emailRequest);
    }
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

  async createEmailRequest(insertEmailRequest: InsertEmailRequest): Promise<EmailRequest> {
    const [emailRequest] = await db
      .insert(emailRequests)
      .values(insertEmailRequest)
      .returning();
    return emailRequest;
  }

  async getEmailRequestsByAssessment(assessmentId: string): Promise<EmailRequest[]> {
    return await db.select().from(emailRequests).where(eq(emailRequests.assessmentId, assessmentId));
  }

  async getAllEmailRequests(): Promise<EmailRequest[]> {
    return await db.select().from(emailRequests);
  }

  async updateEmailRequestSentStatus(id: string, sentAt: Date): Promise<void> {
    await db
      .update(emailRequests)
      .set({ emailSent: 'true', sentAt })
      .where(eq(emailRequests.id, id));
  }
}

// Use in-memory storage for development, database for production
const useDatabase = process.env.NODE_ENV === 'production' && process.env.USE_MEMORY_STORAGE !== 'true';

console.log(`[Storage] Using ${useDatabase ? 'PostgreSQL Database' : 'In-Memory'} storage`);

export const storage = useDatabase ? new DatabaseStorage() : new MemStorage();

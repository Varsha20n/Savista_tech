import { db } from "./db";
import {
  services,
  caseStudies,
  contactMessages,
  type InsertService,
  type InsertCaseStudy,
  type InsertContactMessage,
  type Service,
  type CaseStudy,
  type ContactMessage
} from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getCaseStudies(): Promise<CaseStudy[]>;
  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return await db.select().from(caseStudies);
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(msg).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();

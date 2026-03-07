import {
  type InsertService,
  type InsertPortfolio,
  type InsertContactMessage,
  type Service,
  type Portfolio,
  type ContactMessage
} from "@shared/schema";

export interface IStorage {
  getServices(): Promise<Service[]>;
  getPortfolio(): Promise<Portfolio[]>;
  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;
}

// In-memory mock storage for development without database
export class MockStorage implements IStorage {
  private services: Service[] = [
    { id: 1, title: "Custom Software Development", description: "End-to-end software solutions tailored to your unique business needs.", icon: "Code2" },
    { id: 2, title: "Cloud Architecture", description: "Scalable and secure cloud infrastructure design and implementation.", icon: "Cloud" },
    { id: 3, title: "Digital Transformation", description: "Modernize your legacy systems with cutting-edge technology.", icon: "Zap" },
    { id: 4, title: "AI & Machine Learning", description: "Intelligent solutions that learn and adapt to your data.", icon: "Brain" },
    { id: 5, title: "UI/UX Design", description: "Intuitive and engaging user experiences that delight customers.", icon: "Palette" },
    { id: 6, title: "Cybersecurity", description: "Robust protection for your critical digital assets and infrastructure.", icon: "Shield" },
  ];

  private portfolio: Portfolio[] = [
    { id: 1, title: "FinTech Platform Overhaul", description: "Redesigned a legacy banking system, improving transaction speed by 400%.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", results: "400% faster transactions", icon: "Code2", tags: ["Enterprise Mobility", "Workplace Solutions", "Cloud Solutions"] },
    { id: 2, title: "Healthcare Data Portal", description: "Built a secure, HIPAA-compliant patient data portal used by 50+ clinics.", imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800", results: "HIPAA Compliant & 50+ Clinics", icon: "Shield", tags: ["Network and Endpoint Inventory Assessments", "Network Device Configuration Assessment", "Network Map Build Out"] },
    { id: 3, title: "Eco Logistics", description: "AI-driven route optimization for global shipping.", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590e?auto=format&fit=crop&q=80&w=800", results: "40% fuel reduction", icon: "Zap", tags: ["Help/Service Desk", "Advanced Professional Services", "Managed NOC & SOC"] }
  ];

  private contactMessages: ContactMessage[] = [];
  private nextId = 1;

  async getServices(): Promise<Service[]> {
    return Promise.resolve(this.services);
  }

  async getPortfolio(): Promise<Portfolio[]> {
    return Promise.resolve(this.portfolio);
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: this.nextId++,
      ...msg
    };
    this.contactMessages.push(newMessage);
    return Promise.resolve(newMessage);
  }
}

export const storage = new MockStorage();

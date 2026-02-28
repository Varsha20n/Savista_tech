import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { services, caseStudies } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.services.list.path, async (req, res) => {
    const data = await storage.getServices();
    res.json(data);
  });

  app.get(api.caseStudies.list.path, async (req, res) => {
    const data = await storage.getCaseStudies();
    res.json(data);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingServices = await storage.getServices();
  if (existingServices.length === 0) {
    await db.insert(services).values([
      { title: "Custom Software Development", description: "End-to-end software solutions tailored to your unique business needs.", icon: "Code2" },
      { title: "Cloud Architecture", description: "Scalable and secure cloud infrastructure design and implementation.", icon: "Cloud" },
      { title: "Digital Transformation", description: "Modernize your legacy systems with cutting-edge technology.", icon: "Zap" },
      { title: "AI & Machine Learning", description: "Intelligent solutions that learn and adapt to your data.", icon: "Brain" },
      { title: "UI/UX Design", description: "Intuitive and engaging user experiences that delight customers.", icon: "Palette" },
      { title: "Cybersecurity", description: "Robust protection for your critical digital assets and infrastructure.", icon: "Shield" },
    ]);
  }

  const existingCases = await storage.getCaseStudies();
  if (existingCases.length === 0) {
    await db.insert(caseStudies).values([
      { title: "FinTech Platform Overhaul", description: "Redesigned a legacy banking system, improving transaction speed by 400%.", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", results: "400% faster transactions" },
      { title: "Healthcare Data Portal", description: "Built a secure, HIPAA-compliant patient data portal used by 50+ clinics.", imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800", results: "HIPAA Compliant & 50+ Clinics" },
      { title: "E-Commerce Logistics AI", description: "Implemented an AI-driven logistics routing system, saving $2M annually.", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a71?auto=format&fit=crop&q=80&w=800", results: "$2M Annual Savings" }
    ]);
  }
}

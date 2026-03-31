import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { usePortfolio } from "@/hooks/use-case-studies";
import { ArrowRight, ExternalLink, Code2, Cloud, Zap, Brain, Palette, Shield, Truck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_CASES = [
  { id: 1, title: "FinTech Evolution", description: "Complete digital transformation for a leading global bank.", results: "300% faster processing", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop", tags: ["Enterprise Mobility", "Workplace Solutions", "Cloud Solutions"], icon: Code2 },
  { id: 2, title: "Healthcare Nexus", description: "A secure, centralized patient management portal.", results: "Zero data breaches", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop", tags: ["Network and Endpoint Inventory Assessments", "Network Device Configuration Assessment", "Network Map Build Out"], icon: Shield },
  { id: 3, title: "Eco Logistics", description: "AI-driven route optimization for global shipping.", results: "40% fuel reduction", imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop", tags: ["Network and Endpoint Inventory Assessments", "Network Device Configuration Assessment", "Network Map Build Out"], icon: Truck },
  { id: 4, title: "Retail Command", description: "Unified commerce platform handling massive scale.", results: "$2B+ processed annually", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop", tags: ["OPEX Model (Pay as you go)", "Cloud Services", "Infra as a Service"], icon: Cloud },
];

import { PageTransition } from "@/components/PageTransition";

export default function PortfolioPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { data: portfolio = [] } = usePortfolio();
  
  const displayCases = portfolio.length > 0 ? portfolio : FALLBACK_CASES;

  useEffect(() => {
    // Reveal animations removed to guarantee content visibility across all devices
  }, [displayCases]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <main ref={containerRef} className="pt-32 pb-24">
          {/* Header Section */}
          <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
            <div className="flex flex-col gap-16 lg:flex-row">
              <div className="lg:w-1/3">
                <div className="sticky top-32">
                  <h2 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">
                    Comprehensive solutions tailored for modern businesses.
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    We provide end-to-end IT infrastructure services that help you innovate, scale, and secure your digital future.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-8 lg:w-2/3">
                {displayCases.map((study, index) => {
                  const IconComponent = study.icon || Code2;
                  
                  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                  };

                  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                  };
                  
                  return (
                    <div 
                      key={study.id}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="portfolio-item group relative flex min-h-[500px] flex-col justify-between overflow-hidden rounded-[2.5rem] p-8 md:p-12 transition-all duration-300 ease-out border border-white/10 shadow-2xl bg-black"
                    >
                      {/* Full BG Image */}
                      <div className="absolute inset-0">
                        <img 
                          src={study.imageUrl}
                          alt=""
                          className="h-full w-full object-cover opacity-60 transition-transform duration-[1.5s] group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Deep Overlay Layers */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-[hsl(var(--cobalt))]/40 mix-blend-multiply opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="mb-8 flex items-start justify-between">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <IconComponent className="w-7 h-7 text-[hsl(var(--cyan))]" />
                          </div>
                          <span className="text-sm font-bold tracking-[0.2em] font-mono text-white/50 group-hover:text-white transition-colors duration-300">
                            0{index + 1}
                          </span>
                        </div>

                        <div className="mt-20 md:mt-32">
                          <h3 className="mb-4 text-4xl md:text-5xl font-display font-medium leading-tight text-white group-hover:text-[hsl(var(--cyan))] transition-colors duration-500">
                            {study.title}
                          </h3>
                          <p className="mb-8 max-w-xl text-lg md:text-xl leading-relaxed text-white/70 group-hover:text-white transition-colors duration-500">
                            {study.description}
                          </p>
                        </div>

                        <div className="mb-10 flex flex-wrap gap-2">
                          {study.tags?.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10 px-4 py-1.5 text-xs font-medium text-white/80"
                            >
                              {tag}
                            </span>
                          ))}
                          {study.tags && study.tags.length > 3 && (
                            <span className="rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-1.5 text-xs font-medium text-white/80">
                              +{study.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 mt-auto pt-8 border-t border-white/10 flex justify-between items-center group/btn cursor-pointer">
                        <span className="text-sm font-bold tracking-widest uppercase text-white group-hover/btn:text-[hsl(var(--cyan))] transition-colors">
                          Explore Case Study
                        </span>
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover/btn:bg-[hsl(var(--cyan))] group-hover/btn:border-[hsl(var(--cyan))] transition-all duration-300 transform group-hover/btn:-rotate-45">
                          <ArrowRight className="h-5 w-5 text-white group-hover/btn:text-black transition-colors" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))] p-8 md:p-12 text-center">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Let's collaborate to create something extraordinary. Get in touch with our team today.
                </p>
                <Link href="/#contact">
                  <button className="px-8 py-4 rounded-full bg-white text-[hsl(var(--cobalt))] font-bold hover:bg-white/90 transition-colors magnetic-interactive">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}


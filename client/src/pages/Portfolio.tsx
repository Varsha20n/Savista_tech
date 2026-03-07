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

export default function PortfolioPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { data: portfolio = [] } = usePortfolio();
  
  const displayCases = portfolio.length > 0 ? portfolio : FALLBACK_CASES;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [displayCases]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
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
                return (
                  <div 
                    key={study.id}
                    className="portfolio-item group relative flex min-h-[450px] flex-col justify-between overflow-hidden rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl bg-[hsl(var(--cobalt))] text-white"
                  >
                    <div className="absolute right-0 bottom-0 h-3/4 w-3/4 opacity-100 mix-blend-overlay transition-transform duration-700 group-hover:scale-110">
                      <img 
                        src={study.imageUrl}
                        alt=""
                        className="h-full w-full object-cover object-top-left"
                      />
                    </div>

                    <div className="relative z-10">
                      <div className="mb-8 flex items-start justify-between">
                        <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium tracking-wider uppercase opacity-90">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="mb-4 text-3xl font-light leading-tight md:text-4xl">
                        {study.title}
                      </h3>
                      <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80">
                        {study.description}
                      </p>

                      <div className="mb-8 flex flex-wrap gap-2">
                        {study.tags?.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="rounded-full border border-current px-3 py-1 text-xs opacity-60"
                          >
                            {tag}
                          </span>
                        ))}
                        {study.tags && study.tags.length > 3 && (
                          <span className="rounded-full border border-current px-3 py-1 text-xs opacity-60">
                            +{study.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto">
                      <a href="#" className="group/btn inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition-all hover:gap-4">
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </a>
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
  );
}


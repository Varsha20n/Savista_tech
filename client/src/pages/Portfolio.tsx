import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCaseStudies } from "@/hooks/use-case-studies";
import { ArrowRight, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_CASES = [
  { id: 1, title: "FinTech Evolution", description: "Complete digital transformation for a leading global bank.", results: "300% faster processing", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop" },
  { id: 2, title: "Healthcare Nexus", description: "A secure, centralized patient management portal.", results: "Zero data breaches", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop" },
  { id: 3, title: "Eco Logistics", description: "AI-driven route optimization for global shipping.", results: "40% fuel reduction", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590e?w=1200&h=800&fit=crop" },
  { id: 4, title: "Retail Command", description: "Unified commerce platform handling massive scale.", results: "$2B+ processed annually", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop" },
];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { data: caseStudies = [] } = useCaseStudies();
  
  const displayCases = caseStudies.length > 0 ? caseStudies : FALLBACK_CASES;

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
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Our <span className="text-[hsl(var(--cyan))]">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore our collection of successful projects that have transformed businesses and delivered exceptional results.
            </p>
            <Link href="/">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-muted hover:bg-muted/80 transition-colors magnetic-interactive">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Home
              </button>
            </Link>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayCases.map((study, index) => (
              <div 
                key={study.id}
                className="portfolio-item group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={study.imageUrl}
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-semibold text-white mb-2">
                      {study.results}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[hsl(var(--cyan))] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {study.description}
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors magnetic-interactive">
                    View Case Study
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
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

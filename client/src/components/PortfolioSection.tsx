import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/hooks/use-case-studies";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_CASES = [
  { id: 1, title: "FinTech Evolution", description: "Complete digital transformation for a leading global bank.", results: "300% faster processing", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop" },
  { id: 2, title: "Healthcare Nexus", description: "A secure, centralized patient management portal.", results: "Zero data breaches", imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop" },
  { id: 3, title: "Eco Logistics", description: "AI-driven route optimization for global shipping.", results: "40% fuel reduction", imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590e?w=1200&h=800&fit=crop" },
  { id: 4, title: "Retail Command", description: "Unified commerce platform handling massive scale.", results: "$2B+ processed annually", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop" },
];

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: portfolio = [] } = usePortfolio();
  
  const displayCases = portfolio.length > 0 ? portfolio : FALLBACK_CASES;

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const container = scrollRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      const totalWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(container, {
        x: -(totalWidth - viewportWidth + 100), // +100 for padding
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          anticipatePin: 1,
        }
      });
    });

    return () => mm.revert();
  }, [displayCases]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 md:h-screen flex flex-col justify-center bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12 md:mb-20 shrink-0">
        <h2 className="text-sm font-medium tracking-widest text-[hsl(var(--cyan))] uppercase mb-4">Portfolio</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-foreground">Featured <span className="text-muted-foreground">Work</span></h3>
      </div>

      <div className="w-full overflow-x-auto md:overflow-visible no-scrollbar pb-8 md:pb-0">
        <div ref={scrollRef} className="flex gap-8 px-6 md:px-12 w-max">
          {displayCases.map((study, idx) => (
            <div 
              key={study.id} 
              className="w-[85vw] md:w-[600px] lg:w-[800px] shrink-0 group cursor-pointer magnetic-interactive"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-6 border border-border">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* Unsplash image via API or fallback */}
                <img 
                  src={study.imageUrl} 
                  alt={study.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="inline-block px-4 py-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10 text-sm font-semibold text-foreground dark:text-white">
                    {study.results}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-3xl font-display font-bold text-foreground mb-2 group-hover:text-[hsl(var(--cyan))] transition-colors">{study.title}</h4>
                  <p className="text-muted-foreground text-lg max-w-lg">{study.description}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-muted">
                  <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

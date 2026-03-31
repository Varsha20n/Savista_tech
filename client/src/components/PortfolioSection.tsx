import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/hooks/use-case-studies";
import { ArrowRight } from "lucide-react";

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
    // Removed GSAP horizontal scroll pinning as it can conflict with layout and cause visibility issues.
    // Native horizontal scrolling (overflow-x-auto) provides a more robust and reliable experience.
  }, [displayCases]);

  return (
    <section id="portfolio" ref={sectionRef} className="py-12 md:py-16 flex flex-col justify-center bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12 md:mb-20 shrink-0">
        <h2 className="text-sm font-medium tracking-widest text-[hsl(var(--cyan))] uppercase mb-4">Portfolio</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-foreground">Featured <span className="text-muted-foreground">Work</span></h3>
      </div>

      <div className="w-full overflow-x-auto no-scrollbar pb-8">
        <div ref={scrollRef} className="flex gap-8 px-6 md:px-12 w-max">
          {displayCases.map((study, idx) => (
            <div 
              key={study.id} 
              className="w-[85vw] md:w-[600px] lg:w-[800px] shrink-0 group relative overflow-hidden rounded-[2rem] aspect-[4/5] md:aspect-[16/9] cursor-pointer magnetic-interactive border border-white/10 shadow-2xl bg-black"
            >
              {/* Background Image with Hover Scale */}
              <div className="absolute inset-0">
                <img 
                  src={study.imageUrl} 
                  alt={study.title}
                  className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
              </div>

              {/* Complex Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[hsl(var(--cobalt))]/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Content Container */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-20">
                <div className="translate-y-4 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col justify-end h-full">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-xl">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 dark:bg-black/40 backdrop-blur-md rounded-full border border-white/20 shadow-lg relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--cyan))]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="w-2 h-2 rounded-full bg-[hsl(var(--cyan))] relative z-10 shadow-[0_0_8px_hsl(var(--cyan))]" />
                        <span className="text-xs md:text-sm font-semibold tracking-wide text-white relative z-10">
                          {study.results}
                        </span>
                      </div>
                      
                      <h4 className="text-3xl md:text-5xl lg:text-5xl font-display font-medium text-white tracking-tight group-hover:text-[hsl(var(--cyan))] transition-colors duration-500">
                        {study.title}
                      </h4>
                      
                      <div className="overflow-hidden md:h-auto">
                        <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-100">
                          {study.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex w-16 h-16 rounded-full border border-white/30 items-center justify-center bg-white/5 backdrop-blur-lg group-hover:bg-[hsl(var(--cyan))] group-hover:border-[hsl(var(--cyan))] transform -rotate-45 group-hover:rotate-0 transition-all duration-500 ease-out shrink-0 hover:scale-110">
                      <ArrowRight className="w-7 h-7 text-white group-hover:text-black transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

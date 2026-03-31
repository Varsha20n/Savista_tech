import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  { num: "01", title: "Discovery", desc: "Understanding your vision, market positioning, and technical requirements through deep-dive workshops." },
  { num: "02", title: "Architecture", desc: "Designing scalable, secure blueprints and beautiful user experiences tailored to your goals." },
  { num: "03", title: "Engineering", desc: "Agile, test-driven development leveraging modern stacks to build robust, high-performance systems." },
  { num: "04", title: "Deployment", desc: "Seamless launch, complete CI/CD integration, and ongoing hypercare support for sustained growth." }
];

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the vertical timeline line
      gsap.fromTo(lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        }
      );

      // Scroll-reveal animations for steps removed to ensure they are always visible
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-background relative overflow-hidden text-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative" ref={containerRef}>
        
        <div className="mb-20">
          <h2 className="text-sm font-medium tracking-widest text-[hsl(var(--cyan))] uppercase mb-4">How We Work</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Our Proven <span className="text-muted-foreground">Process</span></h3>
        </div>

        <div className="relative pl-8 md:pl-16">
          {/* Timeline background line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border" />
          
          {/* Timeline active line */}
          <div ref={lineRef} className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))]" />

          <div className="flex flex-col gap-16 md:gap-24">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="process-step relative group">
                <div className="absolute -left-8 md:-left-16 w-8 h-8 md:w-16 flex items-center justify-center -translate-x-[50%]">
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-[hsl(var(--cobalt))] group-hover:bg-[hsl(var(--cyan))] group-hover:scale-150 transition-all duration-300" />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="text-5xl md:text-7xl font-bold text-transparent [-webkit-text-stroke:1px_hsl(var(--border))] group-hover:[-webkit-text-stroke:1px_hsl(var(--cyan))] group-hover:text-[hsl(var(--cyan))/10] transition-colors duration-300 font-display">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">{step.title}</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

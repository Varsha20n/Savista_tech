import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticButton } from "./MagneticButton";

// Helper to wrap text for GSAP animation
const SplitText = ({ children }: { children: string }) => {
  return (
    <>
      {children.split(" ").map((word, i) => (
        <span key={i} className="split-word">
          <span className="hero-text-word">{word}</span>
        </span>
      ))}
    </>
  );
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the headline words
      gsap.to(".hero-text-word", {
        y: "0%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });

      // Animate the subheadline and buttons
      gsap.fromTo(".hero-fade-in", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 1.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-[0]">
        <video
          src="/video5.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Background Data Flow Effect */}
      <div className="data-flow-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="data-flow-line"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        {/* Deep ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(var(--cobalt))]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border mb-8 hero-fade-in">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--cyan))] animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Premium Software Development</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-foreground">
            <SplitText>Empowering the Next Wave of Digital Innovation</SplitText>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 hero-fade-in font-sans font-light leading-relaxed">
            We build high-end corporate digital experiences and robust software solutions that transform ambitious visions into market-leading realities.
          </p>
          
          <div className="hero-fade-in flex flex-wrap gap-6 items-center">
            <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started
            </MagneticButton>
            
            <button 
              onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-semibold text-foreground tracking-wide border border-transparent hover:border-border transition-all duration-300 magnetic-interactive group"
            >
              <span className="flex items-center gap-2">
                Our Work
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Cpu, Globe, Layers, ShieldCheck, Zap } from "lucide-react";
import { useServices } from "@/hooks/use-services";

gsap.registerPlugin(ScrollTrigger);

// Fallback data if API returns empty
const FALLBACK_SERVICES = [
  { id: 1, title: "Custom Software", description: "Bespoke digital solutions tailored to your complex business requirements.", icon: "Code" },
  { id: 2, title: "Cloud Architecture", description: "Scalable, secure, and resilient cloud infrastructures built for the future.", icon: "Globe" },
  { id: 3, title: "AI & Machine Learning", description: "Intelligent systems that automate processes and extract deep insights.", icon: "Cpu" },
  { id: 4, title: "Enterprise Systems", description: "Robust platforms designed to handle massive scale and mission-critical operations.", icon: "Layers" },
  { id: 5, title: "Cybersecurity", description: "Military-grade protection for your most valuable digital assets.", icon: "ShieldCheck" },
  { id: 6, title: "Performance Optimization", description: "Lightning-fast execution via meticulous code profiling and caching strategies.", icon: "Zap" },
];

const IconMap: Record<string, any> = {
  Code, Globe, Cpu, Layers, ShieldCheck, Zap
};

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: services = [] } = useServices();
  
  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  // Content is now visible by default to ensure reliability
  useEffect(() => {
    // Reveal animations removed for consistent visibility
  }, [displayServices]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="services" className="py-12 md:py-16 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-sm font-medium tracking-widest text-[hsl(var(--cyan))] uppercase mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Digital Excellence <br/><span className="text-muted-foreground">Engineered</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 auto-rows-[minmax(250px,_auto)]">
          {displayServices.map((service, index) => {
            const Icon = IconMap[service.icon] || Code;
            
            // Bento Box layout logic for 6 items in a 4-column grid
            let bentoClass = "md:col-span-2 md:row-span-1";
            if (index === 0) bentoClass = "md:col-span-2 md:row-span-2 bg-gradient-to-br from-card to-background";
            if (index === 1) bentoClass = "md:col-span-2 md:row-span-1";
            if (index === 2) bentoClass = "md:col-span-2 md:row-span-1";
            if (index === 3) bentoClass = "md:col-span-2 md:row-span-1";
            if (index === 4) bentoClass = "md:col-span-2 md:row-span-1";
            if (index === 5) bentoClass = "md:col-span-4 md:row-span-1 bg-gradient-to-r from-[hsl(var(--cobalt))/10] to-transparent";

            return (
              <div 
                key={service.id}
                className={`service-card spotlight-wrapper rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(46,91,255,0.15)] magnetic-interactive border border-border/60 ${bentoClass} flex flex-col`}
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-border/50 shadow-inner ${index === 0 ? 'bg-primary/10' : 'bg-muted/50'}`}>
                    <Icon className="w-6 h-6 text-[hsl(var(--cyan))]" />
                  </div>
                  <h4 className={`font-display font-semibold text-foreground mb-4 ${index === 0 || index === 5 ? 'text-3xl' : 'text-2xl'}`}>{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed font-sans text-lg mt-auto">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

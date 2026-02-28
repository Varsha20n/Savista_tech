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

const IconMap: Record<string, React.ElementType> = {
  Code, Globe, Cpu, Layers, ShieldCheck, Zap
};

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: services = [] } = useServices();
  
  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
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
  }, [displayServices]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="services" className="py-32 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-3xl">
          <h2 className="text-sm font-medium tracking-widest text-[hsl(var(--cyan))] uppercase mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Digital Excellence <br/><span className="text-slate-500">Engineered</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => {
            const Icon = IconMap[service.icon] || Code;
            return (
              <div 
                key={service.id}
                className="service-card spotlight-wrapper h-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-2 magnetic-interactive"
                onMouseMove={handleMouseMove}
              >
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <Icon className="w-6 h-6 text-[hsl(var(--cobalt))]" />
                  </div>
                  <h4 className="text-2xl font-display font-semibold text-white mb-4">{service.title}</h4>
                  <p className="text-slate-400 leading-relaxed font-sans">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

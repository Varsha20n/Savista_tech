import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const StatItem = ({ endValue, label, suffix = "" }: { endValue: number, label: string, suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let obj = { val: 0 };
      gsap.to(obj, {
        val: endValue,
        duration: 2.5,
        ease: "power3.out",
        onUpdate: () => setValue(Math.floor(obj.val))
      });
    }
  }, [isInView, endValue]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="text-5xl md:text-7xl font-display font-bold text-white mb-2 tracking-tighter">
        {value}{suffix}
      </div>
      <div className="text-slate-400 uppercase tracking-widest text-sm font-medium">{label}</div>
    </div>
  );
};

export function StatsSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" className="py-40 relative overflow-hidden bg-white/[0.01] border-y border-white/5">
      {/* Parallax Background 'S' */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 text-[40rem] font-display font-bold leading-none text-white/[0.02] select-none pointer-events-none z-0"
      >
        S
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <StatItem endValue={150} label="Projects Shipped" suffix="+" />
          <StatItem endValue={10} label="Years Experience" suffix="+" />
          <StatItem endValue={99} label="Client Retention" suffix="%" />
          <StatItem endValue={24} label="Global Awards" />
        </div>
      </div>
    </section>
  );
}

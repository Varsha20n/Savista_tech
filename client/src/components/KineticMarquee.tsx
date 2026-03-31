import Marquee from "react-fast-marquee";

const SERVICES = [
  "AI & MACHINE LEARNING",
  "CLOUD ARCHITECTURE",
  "CYBERSECURITY",
  "CUSTOM SOFTWARE",
  "ENTERPRISE SYSTEMS",
  "PERFORMANCE OPTIMIZATION"
];

export function KineticMarquee() {
  return (
    <section className="py-8 md:py-12 bg-background overflow-hidden border-y border-border/20">
      <div className="relative -rotate-2 scale-105 origin-center">
        <Marquee speed={60} autoFill gradient={false}>
          {SERVICES.map((service, index) => (
            <div key={`row1-${index}`} className="flex items-center mx-4 md:mx-8">
              <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent [-webkit-text-stroke:1px_hsl(var(--muted-foreground))] hover:[-webkit-text-stroke:2px_hsl(var(--cyan))] hover:text-[hsl(var(--cyan))/10] transition-all duration-500 font-display uppercase italic tracking-tighter cursor-crosshair pr-4">
                {service}
              </span>
              <span className="text-3xl md:text-5xl text-[hsl(var(--cobalt))] mx-4 md:mx-8">✦</span>
            </div>
          ))}
        </Marquee>
      </div>
      <div className="relative rotate-2 scale-105 origin-center mt-6 md:mt-12">
        <Marquee speed={50} direction="right" autoFill gradient={false}>
          {SERVICES.map((service, index) => (
            <div key={`row2-${index}`} className="flex items-center mx-4 md:mx-8">
               <span className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent [-webkit-text-stroke:1px_hsl(var(--muted-foreground))] hover:[-webkit-text-stroke:2px_hsl(var(--cobalt))] hover:text-[hsl(var(--cobalt))/10] transition-all duration-500 font-display uppercase italic tracking-tighter cursor-crosshair pr-4">
                {service}
              </span>
              <span className="text-3xl md:text-5xl text-[hsl(var(--cyan))] mx-4 md:mx-8">✦</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

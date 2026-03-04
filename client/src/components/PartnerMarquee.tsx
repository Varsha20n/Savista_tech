import Marquee from "react-fast-marquee";

const PARTNERS = [
  "Microsoft Azure", "AWS", "Google Cloud", "Cisco", "Vercel", "Stripe", "MongoDB", "Figma", "Docker", "OpenAI"
];

export function PartnerMarquee() {
  return (
    <section className="py-12 border-y border-border bg-muted">
      <Marquee speed={40} pauseOnHover={true} gradient={true} gradientColor="hsl(var(--background))" gradientWidth={100}>
        <div className="flex items-center">
          {PARTNERS.map((partner, index) => (
            <div 
              key={index} 
              className="mx-12 lg:mx-20 group cursor-pointer magnetic-interactive"
            >
              <h3 className="text-2xl md:text-4xl font-display font-bold text-foreground/20 group-hover:text-foreground transition-colors duration-500">
                {partner}
              </h3>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}

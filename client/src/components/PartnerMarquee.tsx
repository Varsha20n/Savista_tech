import Marquee from "react-fast-marquee";
import { 
  Server, 
  Globe, 
  Cloud, 
  Network, 
  Code2, 
  CreditCard, 
  Database, 
  PenTool, 
  Box, 
  Brain 
} from "lucide-react";

const PARTNERS = [
  { name: "Microsoft Azure", icon: Server },
  { name: "AWS", icon: Cloud },
  { name: "Google Cloud", icon: Globe },
  { name: "Cisco", icon: Network },
  { name: "Vercel", icon: Code2 },
  { name: "Stripe", icon: CreditCard },
  { name: "MongoDB", icon: Database },
  { name: "Figma", icon: PenTool },
  { name: "Docker", icon: Box },
  { name: "OpenAI", icon: Brain }
];

export function PartnerMarquee() {
  return (
    <section className="py-12 border-y border-border bg-muted">
      <Marquee speed={40} pauseOnHover={true} gradient={true} gradientColor="hsl(var(--background))" gradientWidth={100}>
        <div className="flex items-center">
          {PARTNERS.map((partner, index) => (
            <div 
              key={index} 
              className="mx-12 lg:mx-20 group cursor-pointer magnetic-interactive flex items-center gap-4"
            >
              <partner.icon 
                className="w-12 h-12 md:w-16 md:h-16 text-foreground/20 group-hover:text-foreground transition-colors duration-500"
                strokeWidth={1.5}
              />
              <h3 className="text-xl md:text-3xl font-display font-bold text-foreground/20 group-hover:text-foreground transition-colors duration-500">
                {partner.name}
              </h3>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}

import Marquee from "react-fast-marquee";

const PARTNERS = [
  { name: "Microsoft Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { name: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { name: "Vercel", logo: "https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png" },
  { name: "Stripe", logo: "https://stripe.com/img/v3/home/twitter.png" },
  { name: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
  { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" }
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
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-8 md:h-12 opacity-20 group-hover:opacity-100 transition-opacity duration-500 object-contain"
              />
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}

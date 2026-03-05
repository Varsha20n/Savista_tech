import { useEffect } from "react";
import Lenis from "@studio-freight/react-lenis";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  // Setup intersection observer for reveal masking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-mask').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Lenis root>
      <CustomCursor />
      <Navbar />
      
      <main className="bg-background text-foreground">
        <HeroSection />
        <PartnerMarquee />
        
        <div className="reveal-mask">
          <ServicesSection />
        </div>
        
        <div className="reveal-mask">
          <StatsSection />
        </div>
        
        <PortfolioSection />
        
        <div className="reveal-mask">
          <ContactSection />
        </div>
      </main>
      
      <Footer />
    </Lenis>
  );
}

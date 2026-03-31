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
import { PageTransition } from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { KineticMarquee } from "@/components/KineticMarquee";
import { ProcessTimeline } from "@/components/ProcessTimeline";

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <PageTransition>
      <Lenis root>
        <Navbar />
        
        <main className="bg-background text-foreground">
          <HeroSection />
          <PartnerMarquee />
          <KineticMarquee />
          
          <ServicesSection />
          
          <ProcessTimeline />
          <StatsSection />
          
          <PortfolioSection />
          
          <ContactSection />
        </main>
        
        <Footer />
      </Lenis>
    </PageTransition>
  );
}

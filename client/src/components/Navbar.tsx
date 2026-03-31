import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu if open
    
    if (location !== "/") {
      setLocation(`/#${targetId}`);
    } else {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = targetId;
      }
    }
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Stats", id: "stats" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${scrolled 
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border rounded-b-2xl shadow-sm" 
          : "py-6 bg-transparent border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-display font-bold text-2xl tracking-tighter z-50 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))] flex items-center justify-center">
            <span className="text-white text-xs">S</span>
          </div>
          <span className="text-foreground">Savista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors magnetic-interactive nav-link-underline"
            >
              {item.name}
            </a>
          ))}
          <Link 
            href="/portfolio" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors magnetic-interactive nav-link-underline"
          >
            Portfolio
          </Link>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors magnetic-interactive text-foreground/80 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <button 
          onClick={(e) => handleNavClick(e, 'contact')}
          className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(46,91,255,0.3)] magnetic-interactive"
        >
          Let's Talk
        </button>

        {/* Mobile menu toggle & theme */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/80 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100 py-4 shadow-xl" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col px-6 gap-4">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="text-lg font-medium text-foreground py-2 border-b border-border/40"
            >
              {item.name}
            </a>
          ))}
          <Link 
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-foreground py-2 border-b border-border/40"
          >
            Portfolio
          </Link>
          <button 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="mt-4 w-full px-5 py-3 rounded-full text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all text-center"
          >
            Let's Talk
          </button>
        </nav>
      </div>
    </header>
  );
}

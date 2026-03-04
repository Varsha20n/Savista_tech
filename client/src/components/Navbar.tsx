import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${scrolled 
          ? "py-4 bg-background/70 backdrop-blur-xl border-b border-border" 
          : "py-6 bg-transparent border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))] flex items-center justify-center">
            <span className="text-white text-xs">S</span>
          </div>
          <span className="text-foreground">Savista</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center">
          {["Services", "Case Studies", "Stats", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              onClick={(e) => handleNavClick(e, item.toLowerCase().replace(' ', '-'))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors magnetic-interactive"
            >
              {item}
            </a>
          ))}
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors magnetic-interactive text-foreground/80 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <button 
          onClick={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            handleNavClick(btn as any, 'contact');
          }}
          className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(46,91,255,0.3)] magnetic-interactive"
        >
          Let's Talk
        </button>
      </div>
    </header>
  );
}

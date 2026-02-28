import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-[hsl(var(--cobalt))]/20 blur-[150px] pointer-events-none rounded-t-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display font-bold text-3xl tracking-tighter flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))] flex items-center justify-center">
                <span className="text-white text-lg">S</span>
              </div>
              Savista Tech
            </Link>
            <p className="text-slate-400 max-w-sm">
              Empowering the next wave of digital innovation through high-end corporate software solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {["Services", "Case Studies", "Company", "Careers"].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors magnetic-interactive">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Socials</h4>
            <ul className="space-y-4">
              {["LinkedIn", "Twitter", "GitHub", "Instagram"].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors magnetic-interactive">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Savista Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className = "", ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      // Subtle pull on the button
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.6,
        ease: "power3.out"
      });

      // Even subtler pull on the text
      gsap.to(text, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`
        relative overflow-hidden group magnetic-interactive
        px-8 py-4 rounded-full font-semibold text-white tracking-wide
        border border-white/20 bg-white/5 backdrop-blur-md
        transition-colors duration-300
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[10px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--cobalt))] to-[hsl(var(--cyan))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span ref={textRef} className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </button>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fix: Set initial off-screen position via GSAP to preserve the left:0 top:0 coordinate system
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // Fast position updates with GSAP quickTo
    const xDot = gsap.quickTo(dot, "x", { duration: 0, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0, ease: "none" });
    
    // Trail effect for the ring element
    const xRing = gsap.quickTo(ring, "x", { duration: 0.15, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      // Robust hover detection
      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive = 
          target.tagName?.toLowerCase() === 'a' || 
          target.tagName?.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button') ||
          target.closest('.magnetic-interactive');
        
        setIsHovering(!!isInteractive);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.classList.add('has-custom-cursor');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`}
      />
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`}
      />
    </>
  );
}

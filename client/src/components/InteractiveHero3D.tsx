import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function InteractiveHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    controls.start({
      x: mousePosition.x * 100 - 50,
      y: mousePosition.y * 100 - 50,
      transition: { type: 'spring', damping: 50, stiffness: 200, mass: 0.5 }
    });
  }, [mousePosition, controls]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[1] w-full h-full overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
      <motion.div 
        animate={controls}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw]"
      >
        {/* Glow 1 */}
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full bg-[hsl(var(--cobalt))] rounded-full blur-[100px] md:blur-[150px] opacity-50 mix-blend-screen"
        />
        {/* Glow 2 */}
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.5, 1], x: [0, 100, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-3/4 h-3/4 bg-[hsl(var(--cyan))] rounded-full blur-[80px] md:blur-[120px] opacity-40 mix-blend-screen transform translate-x-1/4 translate-y-1/4"
        />
      </motion.div>
    </div>
  );
}

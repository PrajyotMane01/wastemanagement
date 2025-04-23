
import { ReactNode, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reqIdRef = useRef<number | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      reqIdRef.current = requestAnimationFrame(raf);
    }
    
    reqIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current);
        reqIdRef.current = null;
      }
      lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;

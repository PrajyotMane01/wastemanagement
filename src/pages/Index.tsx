
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import AreasWeServe from "@/components/AreasWeServe";
// import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const isMobile = useIsMobile();
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.2 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  useEffect(() => {
    if (isMobile) return;
    
    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      
      cursorX.set(clientX);
      cursorY.set(clientY);
    };
    
    window.addEventListener("mousemove", mouseMove);
    
    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");
    
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    const observer = new MutationObserver(() => {
      const newInteractiveElements = document.querySelectorAll('a, button, .interactive');
      
      newInteractiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      observer.disconnect();
    };
  }, [isMobile, cursorX, cursorY]);
  
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#F8F6F2] relative overflow-x-hidden">
        {!isMobile && (
          <AnimatePresence>
            <motion.div
              className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
              style={{
                x: cursorX,
                y: cursorY,
                height: cursorVariant === "default" ? 32 : 64,
                width: cursorVariant === "default" ? 32 : 64,
                backgroundColor: cursorVariant === "default" 
                  ? "rgba(108, 59, 170, 0.5)" 
                  : "rgba(108, 59, 170, 0.7)",
                translateX: cursorVariant === "default" ? -16 : -32,
                translateY: cursorVariant === "default" ? -16 : -32
              }}
            />
          </AnimatePresence>
        )}
        
        <Navbar />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariant}
        >
          <Hero />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <Services />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <WhyChooseUs />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <AreasWeServe />
        </motion.div>
        
        {/* <Testimonials /> */}
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <CaseStudies />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <ContactForm />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <FAQ />
        </motion.div>
        
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
};

export default Index;

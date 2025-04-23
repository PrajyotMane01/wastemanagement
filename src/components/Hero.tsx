import { useState, useEffect } from "react";
import { motion, useAnimation, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    serviceType: "Waste Collection",
    message: "",
  });
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setIsContactFormOpen(false);
    setFormState({
      name: "",
      phone: "",
      email: "",
      company: "",
      serviceType: "Waste Collection",
      message: "",
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    controls.start("visible");
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50"
      style={{ opacity, scale }}
      id="home"
    >
      {/* Cursor spotlight effect */}
      <motion.div
        className="cursor-highlight"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />
      
      {/* Floating shapes - keep them for background effect */}
      <motion.div 
        className="absolute top-[20%] right-[10%] w-16 h-16 rounded-full bg-[#D27D2D]/10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[30%] left-[15%] w-24 h-24 rounded-md bg-[#6B5D44]/10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute top-[40%] right-[20%] w-32 h-32 rounded-lg bg-[#D27D2D]/5"
        animate={{
          y: [0, 30, 0],
          rotate: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Main hero content - THREE COLUMN LAYOUT */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-12 lg:px-20 items-center min-h-[90vh]">
        {/* Left image column */}
        <motion.div 
          className="hidden md:flex md:col-span-3 md:col-start-1 justify-end items-center h-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden relative shadow-lg"
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            animate={controls}
          >
            <motion.div
              className="w-full h-full"
              variants={imageHoverVariants}
            >
              <img 
                src="./hero-image-1.png" 
                alt="Team collaboration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Center content column */}
        <motion.div 
          className="md:col-span-6 md:col-start-4 flex flex-col justify-center items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Trust badge */}
          <motion.div
            className="bg-[#2D3748] text-white px-6 py-2 rounded-full text-sm mb-8"
            variants={itemVariants}
          >
            +55,000 BUSINESS TRUST
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-4 leading-tight"
            variants={itemVariants}
          >
            <span>Fast. Clean. </span>
            <span className="text-[#6C3BAA]">Reliable.</span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-12 text-lg max-w-lg"
            variants={itemVariants}
          >
            Simplifying waste management for a cleaner tomorrow.
          </motion.p>
          
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.button 
              className="bg-[#6C3BAA] text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-[#5a3190] transition-all"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(108, 59, 170, 0.4)" 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsContactFormOpen(true)}
            >
              Request a Pickup
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Right image column */}
        <motion.div 
          className="hidden md:flex md:col-span-3 md:col-start-10 justify-start items-center h-full"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden relative shadow-lg"
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            animate={controls}
          >
            <motion.div
              className="w-full h-full"
              variants={imageHoverVariants}
            >
              <img 
                src="/hero-image-2.png" 
                alt="Professional at work" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Feature bar */}
      <div className="bg-[#6C3BAA] py-6 px-6 md:px-12 lg:px-20 w-full">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center text-white justify-center gap-6 md:gap-0">
    
    {/* Left */}
    <motion.div 
      className="flex-1 flex justify-center md:justify-end items-center space-x-3 md:mr-5"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-[#5a3190] p-2 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <span className="text-sm font-medium">Fast Response</span>
    </motion.div>

    {/* Center */}
    <motion.div 
      className="flex-1 flex justify-center items-center space-x-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="bg-[#5a3190] p-2 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm font-medium">Eco-Friendly</span>
    </motion.div>

    {/* Right */}
    <motion.div 
      className="flex-1 flex justify-center md:justify-start items-center space-x-3 md:ml-5"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="bg-[#5a3190] p-2 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <span className="text-sm font-medium">Licensed & Insured</span>
    </motion.div>

  </div>
</div>

      
     
      {/* Contact Form Popup */}
      <AnimatePresence>
        {isContactFormOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsContactFormOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-gradient-to-br from-[#2B2B2B] to-[#1a1a1a] p-8 rounded-xl border border-[#6C3BAA]/30 relative shadow-2xl text-white overflow-hidden w-full max-w-lg mx-auto">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C3BAA]/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C08457]/10 blur-3xl rounded-full"></div>
                <button
                  onClick={() => setIsContactFormOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-[#C08457] transition-colors z-10"
                >
                  <X className="h-6 w-6" />
                </button>
                
                <div className="relative z-10">
                  <span className="text-[#C08457] text-sm uppercase tracking-wider mb-2 block">Get Started</span>
                  <h2 className="text-2xl font-bold mb-6">Book Your Service</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="bg-[#3a3a3a] border-[#6C3BAA]/30 text-white placeholder:text-gray-400 focus:border-[#C08457] focus:ring-[#C08457] transition-colors text-sm px-2 py-2 md:text-base md:px-3 md:py-3"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        className="bg-[#3a3a3a] border-[#6C3BAA]/30 text-white placeholder:text-gray-400 focus:border-[#C08457] focus:ring-[#C08457] transition-colors text-sm px-2 py-2 md:text-base md:px-3 md:py-3"
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="bg-[#3a3a3a] border-[#6C3BAA]/30 text-white placeholder:text-gray-400 focus:border-[#C08457] focus:ring-[#C08457] transition-colors text-sm px-2 py-2 md:text-base md:px-3 md:py-3"
                        placeholder="Your email"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 focus:border-[#6C3BAA] transition-colors text-sm px-2 py-2 md:text-base md:px-3 md:py-3"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium mb-2">
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formState.serviceType}
                      onChange={handleChange}
                      className="bg-[#3a3a3a] border-[#4a4a4a] text-white rounded px-2 py-2 md:px-3 md:py-3 focus:border-[#6C3BAA] transition-colors w-full text-sm md:text-base"
                      required
                    >
                      <option value="Waste Collection">Waste Collection</option>
                      <option value="Site Clearance">Site Clearance</option>
                      <option value="On-Call Pickup">On-Call Pickup</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message / Additional Notes
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 min-h-[60px] md:min-h-[120px] focus:border-[#6C3BAA] transition-colors text-sm px-2 py-2 md:text-base md:px-3 md:py-3"
                      placeholder="Your message or additional notes"
                      required
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#6C3BAA] to-[#5a3190] hover:from-[#5a3190] hover:to-[#4a2870] text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#6C3BAA]/20"
                    >
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </motion.div>
                </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Hero;

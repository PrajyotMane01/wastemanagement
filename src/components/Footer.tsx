
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <footer className="relative">
      <div className="bg-[#0F1419] text-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6B5D44] via-[#D27D2D] to-[#6B5D44]"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 rounded-full bg-[#D27D2D]/10 blur-3xl"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 rounded-full bg-[#D27D2D]/5 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="md:col-span-5" variants={itemVariants}>
              <div className="flex items-center mb-6">
                <img src="/image.png" alt="Clearsite Logo" className="h-12 w-12 mr-2 object-contain" />
                <span className="font-playfair font-semibold text-lg tracking-wider">Clearsite</span>
              </div>
              
              <h2 className="text-xl md:text-3xl font-bold leading-tight mb-6">We create experiences that transform brands.</h2>
              <p className="text-gray-400 mb-8">
                Our agency crafts distinctive digital solutions that elevate your brand. With a focus on intuitive design and flawless development, we help businesses build stronger connections with their audience.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            
            
          </motion.div>
          
          <div className="border-b border-white/10 mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">About Us</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Company</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Team</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Careers</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/blog" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Blog</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Resources</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Guides</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>All Services</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Pricing</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Case Studies</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>About Us</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Contact Us</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-sm text-gray-300 hover:text-white transition-colors relative group flex items-center">
                    <span>Support</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <div className="border-b border-white/10 mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">© 2025 Artisan. All rights reserved.</p>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookies Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute -top-6 right-6 md:right-12 w-12 h-12 bg-[#D27D2D] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#c06c1d] transition-colors"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;

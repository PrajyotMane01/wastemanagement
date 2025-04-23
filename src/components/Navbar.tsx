import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%"
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return <motion.nav className={cn("fixed w-full py-4 px-6 md:px-12 lg:px-20 flex items-center justify-between z-50 transition-all duration-300", isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent")} initial="hidden" animate="visible" variants={navVariants}>
      <motion.div variants={itemVariants} className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="Clear Site Logo" className="h-16" />
        </Link>
      </motion.div>
      
      <div className="hidden md:flex items-center space-x-8">
  {["Home", "About Us", "Areas We Serve", "Case Studies", "Contact Us"].map((item, i) => (
    <motion.div key={item} variants={itemVariants}>
      <a
        href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-sm font-medium hover:text-primary/80 transition-colors relative group"
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D27D2D] transition-all duration-300 group-hover:w-full"></span>
      </a>
    </motion.div>
  ))}
</div>

      
      <motion.div variants={itemVariants} className="hidden md:block">
        <Button className="bg-[#6B5D44] hover:bg-[#5a4e39] text-white rounded-sm px-5 flex items-center gap-2 overflow-hidden group">
          <span className="relative z-10">Get Started</span>
          <span className="w-0 h-full absolute top-0 right-0 bg-[#D27D2D] transition-all duration-500 group-hover:w-full -z-0"></span>
        </Button>
      </motion.div>
      
      <motion.button variants={itemVariants} className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      <motion.div className="fixed top-0 right-0 h-screen w-4/5 bg-white shadow-2xl p-6 z-50 md:hidden" initial="closed" animate={mobileMenuOpen ? "open" : "closed"} variants={mobileMenuVariants}>
        <div className="flex justify-end mb-10">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-6">
          {["Home", "About Us", "Services", "Case Studies", "Contact Us"].map(item => <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-lg font-medium hover:text-primary/80 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              {item}
            </Link>)}
          <Button className="bg-[#6B5D44] hover:bg-[#5a4e39] text-white rounded-sm px-5 mt-6">
            Get Started
          </Button>
        </div>
      </motion.div>
      
      {mobileMenuOpen && <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={() => setMobileMenuOpen(false)} />}
    </motion.nav>;
};

export default Navbar;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    
    // If we're not on the home page, navigate to home page first
    if (location.pathname !== '/') {
      navigate('/');
      // Use setTimeout to ensure navigation happens before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handlePageNavigation = (path: string) => {
    navigate(path);
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
          <img src="/logo.png" alt="Clear Site Logo" className="h-24 -my-4" />
        </Link>
      </motion.div>
      
      <div className="hidden md:flex items-center space-x-8">
        {[
          { name: "Home", type: "scroll", id: "home" },
          { name: "About Us", type: "page", path: "/about" },
          { name: "Areas We Serve", type: "scroll", id: "areas-we-serve" },
          { name: "Case Studies", type: "page", path: "/Blogs" },
          { name: "Contact Us", type: "scroll", id: "contact-us" }
        ].map((item) => (
          <motion.div key={item.name} variants={itemVariants}>
            {item.type === "scroll" ? (
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavLinkClick(e, item.id)}
                className="text-sm font-medium hover:text-primary/80 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D27D2D] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ) : (
              <Link
                to={item.path}
                className="text-sm font-medium hover:text-primary/80 transition-colors relative group"
                onClick={() => handlePageNavigation(item.path)}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D27D2D] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      
<motion.div variants={itemVariants} className="hidden md:block">
  <a 
    href="#contact-us"
    onClick={(e) => handleNavLinkClick(e, 'contact-us')}
  >
    <Button className="bg-[#483285] text-white rounded-sm px-5 flex items-center gap-2">
      <span>Get Started</span>
    </Button>
  </a>
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
          {[
            { name: "Home", type: "scroll", id: "home" },
            { name: "About Us", type: "page", path: "/about" },
            { name: "Areas We Serve", type: "scroll", id: "areas-we-serve" },
            { name: "Case Studies", type: "page", path: "/Blogs" },
            { name: "Contact Us", type: "scroll", id: "contact-us" }
          ].map((item) => (
            item.type === "scroll" ? (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavLinkClick(e, item.id)}
                className="text-lg font-medium hover:text-primary/80 transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="text-lg font-medium hover:text-primary/80 transition-colors"
                onClick={() => handlePageNavigation(item.path)}
              >
                {item.name}
              </Link>
            )
          ))}
          <Button 
            className="bg-[#6B5D44] hover:bg-[#5a4e39] text-white rounded-sm px-5 mt-6"
            onClick={(e) => handleNavLinkClick(e, 'contact-us')}
          >
            Get Started
          </Button>
        </div>
      </motion.div>
      
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </motion.nav>;
};

export default Navbar;

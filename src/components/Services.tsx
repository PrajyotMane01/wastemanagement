
import { motion } from "framer-motion";
import { ArrowRight, Trash, Truck, ClipboardCheck } from "lucide-react";

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };
  
  const services = [
    {
      title: "Waste Collection",
      description: "– On-demand pickup for construction, renovation, residential and commercial waste",
      icon: <Trash className="h-5 w-5" />,
      color: "bg-white",
      textColor: "text-gray-600"
    },
    {
      title: "Site Clearance",
      description: "Full-service clearing for safe, inspection-ready job sites",
      icon: <ClipboardCheck className="h-5 w-5" />,
      color: "bg-[#6B5D44]",
      textColor: "text-gray-200"
    },
    {
      title: "Emergency Pickup",
      description: "Rapid response cleanup when time and safety matter most",
      icon: <Truck className="h-5 w-5" />,
      color: "bg-white",
      textColor: "text-gray-600"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden" id="about-us">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#D27D2D]/5 blur-3xl"></div>
      <div className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-[#6B5D44]/5 blur-3xl"></div>
      
      <motion.div 
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.span 
          className="text-sm uppercase tracking-wider text-[#D27D2D] mb-2 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our expertise
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Do</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our company offers multiple services to help clients achieve their goals.
          With years of experience, we can serve you better.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className={`${service.color} p-8 rounded-lg shadow-lg hover:shadow-xl transition-all card-hover relative overflow-hidden group`}
            variants={itemVariants}
          >
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#D27D2D]/10 group-hover:bg-[#D27D2D]/20 transition-all duration-500"></div>
            
            <div className={`relative z-10 flex flex-col h-full`}>
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-[#D27D2D]/20 transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className={`${service.textColor} text-sm mb-6 flex-grow`}>{service.description}</p>
              
              <a 
                href="#" 
                className={`inline-flex items-center space-x-2 text-[#D27D2D] font-medium group-hover:translate-x-2 transition-transform duration-300`}
              >
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
  
      
      {/* Decorative element */}
      <div className="absolute right-0 bottom-0 w-28 h-28 bg-[#6B5D44]/10 rounded-tl-3xl"></div>
    </section>
  );
};

export default Services;

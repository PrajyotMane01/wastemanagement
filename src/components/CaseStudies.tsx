
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CaseStudies = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const blogPosts = [

    {
      id: 2,
      title: "Eco-Friendly Waste Disposal in Dubai: What You Need to Know",
      excerpt: "Dubai has been pushing for greener, more sustainable construction practices. In this blog, we break down local guidelines for eco-conscious waste management and explain how ClearSite supports Dubai’s sustainability vision through responsible disposal, recycling partnerships, and landfill reduction",
      category: "Sustainability",
      bgColor: "#ffd7b5",
      iconBg: "#C08457",
      iconText: "eco",
      date: "July 2023",
      size: "small"
    },
    {
      id: 3,
      title: "What to Expect from a Professional Site Clearance Service",
      excerpt: "Not all site clearance services are created equal. We highlight the benefits of working with a professional crew — from equipment and training to legal compliance — and explain why a reliable partner like ClearSite can help you avoid unnecessary delays and liabilities.",
      category: "Services",
      bgColor: "#E0F7FF",
      iconBg: "#67D4F8",
      iconText: "pro",
      date: "August 2023",
      size: "small"
    },
    {
      id: 4,
      title: "Sustainability in Waste Management",
      excerpt: "How to reduce environmental impact through ClearSite's specialized services.",
      category: "Green Initiatives",
      bgColor: "#F0FFE6",
      iconBg: "#8FA396",
      iconText: "green",
      date: "September 2023",
      size: "medium"
    },
    {
      id: 5,
      title: "Legal Compliance in Waste Disposal for UAE Businesses",
      excerpt: "Understanding Dubai Municipality standards and how to stay compliant.",
      category: "Compliance",
      bgColor: "#F9E6FF",
      iconBg: "#6C3BAA",
      iconText: "legal",
      date: "October 2023",
      size: "medium"
    }
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getSizeClass = (size: string) => {
    switch(size) {
 
      case 'medium':
        return 'col-span-1 row-span-1 md:col-span-3 md:row-span-1';
      default:
        return 'col-span-1 row-span-1 md:col-span-3 md:row-span-1';
    }
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#F8F6F2] overflow-hidden" id="case-studies">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl font-bold mb-4 text-[#2B2B2B]">Our Blog</h2>
        <p className="text-[#2B2B2B] mt-4 max-w-2xl mx-auto">
          Insights, tips, and updates from the ClearSite team on waste management and sustainable practices
        </p>
      </motion.div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5 auto-rows-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id}
              className={`${getSizeClass(post.size)} relative group`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div 
                className={`w-full h-full rounded-2xl p-6 overflow-hidden transition-all duration-500 ease-out
                           ${post.id === hoveredId ? 'scale-[0.98]' : 'scale-100'}`}
                style={{ backgroundColor: post.bgColor }}
              >
                <div className="flex flex-col h-full">
                  <div
                    className={`aspect-video rounded-xl mb-4 transition-transform duration-500 overflow-hidden
                               ${post.size === 'large' ? 'md:w-1/2' : 'w-full'}`}
                    style={{ backgroundColor: post.iconBg }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{post.iconText}</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col justify-between h-full ${post.size === 'large' && 'md:mt-4'}`}>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-black/10 text-black/80">{post.category}</span>
                      </div>
                      <h3 className={`font-bold mb-3 text-[#2B2B2B] ${post.size === 'large' ? 'text-xl md:text-2xl' : 'text-lg'}`}>{post.title}</h3>
                      
                      {(post.size === 'large' || post.size === 'medium') && (
                        <p className="text-sm text-[#2B2B2B]/70 mb-4">{post.excerpt}</p>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-[#2B2B2B]/70">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          <span>{post.date}</span>
                        </div>
                        {post.readTime && (
                          <div className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        )}
                      </div>
                      
                      <motion.div
                        className="group relative rounded-full w-10 h-10 bg-[#6C3BAA] flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute"
                          initial={{ rotate: 0 }}
                          animate={post.id === hoveredId ? { rotate: 45 } : { rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight size={16} className="text-white" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="mt-16 text-center">
        <Link to="/Blogs">
          <motion.button 
            className="group relative overflow-hidden border border-[#6C3BAA] px-6 py-3 rounded-full bg-[#6C3BAA] text-white transition-all duration-500 flex items-center gap-2 mx-auto hover:pr-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Blog Posts</span>
            <motion.div 
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default CaseStudies;

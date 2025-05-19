import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  readTime?: string;
  image?: {
    url: string;
  };
}

const CaseStudies = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs?limit=4&sort=-createdAt`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setBlogPosts(data.docs);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentBlogs();
  }, []);

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

  const getSizeClass = (index: number) => {
    // All posts have the same size
    return 'col-span-1 row-span-1 md:col-span-3 md:row-span-1';
  };

  if (isLoading) {
    return (
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#F8F6F2] overflow-hidden">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

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
          {blogPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              className={`${getSizeClass(index)} relative group`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link to={`/blog/${post.slug}`}>
                <div 
                  className={`w-full h-full rounded-2xl p-6 overflow-hidden transition-all duration-500 ease-out
                             ${post.id === hoveredId ? 'scale-[0.98]' : 'scale-100'}`}
                  style={{ backgroundColor: post.category === 'Sustainability' ? '#ffd7b5' : 
                          post.category === 'Services' ? '#E0F7FF' : 
                          post.category === 'Green Initiatives' ? '#F0FFE6' : '#F9E6FF' }}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className="aspect-video rounded-xl transition-transform duration-500 overflow-hidden w-full"
                    >
                      {post.image && post.image.url ? (
                        <img 
                          src={post.image.url} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="/hero-image-1.png"
                          alt="Blog placeholder"
                          className="w-full h-full object-cover opacity-60"
                        />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center mt-3">
                        <span className="inline-block px-3 py-1 text-xs rounded-full bg-black/10 text-black/80">
                          {post.category}
                        </span>
                      </div>
                      <h3 className={`font-bold mt-2 text-[#2B2B2B]`}>
                        {post.title}
                      </h3>
                      
                      {(index === 0 || index === 1) && (
                        <p className="text-sm text-[#2B2B2B]/70 mt-2">{post.excerpt}</p>
                      )}
                    </div>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-[#2B2B2B]/70">
                        <div className="flex items-center">
                          <Calendar size={12} className="mr-1" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
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
              </Link>
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

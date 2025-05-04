'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, Book, Calendar, Clock, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

// Types for our blog posts
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  bgColor: string;
  iconBg: string;
  iconText: string;
  date: string;
  readTime?: string;
  size: "small" | "medium" | "large";
  slug: string;
}

// Type for Payload CMS post response
interface PayloadPost {
  id: string;
  title: string;
  excerpt?: string;
  category?: { name: string };
  bgColor?: string;
  iconBg?: string;
  iconText?: string;
  createdAt: string;
  readTime?: string;
  content?: string;
  size?: "small" | "medium" | "large";
  slug: string;
}

// Function to fetch blog posts from Payload CMS API
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Payload CMS API endpoint
    const response = await fetch("http://localhost:3000/api/blog-posts");
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Check if the response has the expected structure
    if (!data.docs || !Array.isArray(data.docs)) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Unexpected API response structure");
    }
    
    // Map the Payload CMS response to our BlogPost interface
    return data.docs.map((post: PayloadPost) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || "",
      category: post.category?.name || "Uncategorized",
      bgColor: post.bgColor || "#F8F6F2",
      iconBg: post.iconBg || "#6C3BAA",
      iconText: post.iconText || post.category?.name?.substring(0, 3).toLowerCase() || "post",
      date: new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      readTime: post.readTime || (post.content ? `${Math.ceil(post.content.length / 1000)} min read` : "3 min read"),
      size: post.size || "medium",
      slug: post.slug
    }));
  } catch (error) {
    console.error("Error fetching blog posts from Payload CMS:", error);
    throw error; // Re-throw the error to be handled by React Query's error state
  }
};

const Blogs = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 6;

  // Fetch blog posts using React Query
  const { data: blogPosts = [], isLoading, error, isError } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    retry: 1, // Only retry once if the request fails
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  // Filter posts based on search term
  const filteredPosts = blogPosts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

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

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const getSizeClass = (size: string) => {
    switch(size) {
      case 'large':
        return 'col-span-2 row-span-2 md:col-span-6 md:row-span-2';
      case 'medium':
        return 'col-span-1 row-span-1 md:col-span-3 md:row-span-1';
      default:
        return 'col-span-1 row-span-1 md:col-span-3 md:row-span-1';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F2] to-[#F2F0E8]">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-r from-[#6C3BAA]/10 to-[#C08457]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="container mx-auto px-6 py-16 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#6C3BAA]/10 text-[#6C3BAA] text-sm font-medium">
              <span className="flex items-center gap-2">
                <Book size={16} />
                Insights & Resources
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#6C3BAA] to-[#C08457] bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-[#2B2B2B]/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Insights, tips, and updates from the ClearSite team on waste management and sustainable practices
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-6 rounded-xl border-[#6C3BAA]/20 focus:border-[#6C3BAA] focus:ring-1 focus:ring-[#6C3BAA] bg-white/80 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </motion.div>
          
          {/* Category Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {["All Topics", "Waste Management", "Sustainability", "Services", "Compliance", "Recycling"].map((category, index) => (
              <button 
                key={index} 
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  index === 0 
                    ? "bg-[#6C3BAA] text-white" 
                    : "bg-white/50 backdrop-blur-sm text-[#2B2B2B]/70 hover:bg-[#6C3BAA]/10 hover:text-[#6C3BAA]"
                )}
                onClick={() => {
                  if (index === 0) {
                    setSearchTerm("");
                  } else {
                    setSearchTerm(category);
                  }
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-10 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[#F8F6F2] pointer-events-none"></div>
        <motion.div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#6C3BAA]/30 to-[#C08457]/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#8FA396]/30 to-[#C08457]/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </motion.div>
      
      {/* Blog Posts Section */}
      <section className="py-12 px-6 md:px-12 lg:px-20 bg-[#F8F6F2]">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C3BAA]"></div>
          </div>
        ) : isError ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
            <div className="text-red-500 mb-4 text-5xl">😕</div>
            <h3 className="text-xl font-semibold mb-2">Unable to Load Blog Posts</h3>
            <p className="text-[#2B2B2B]/70 mb-4">There was an error connecting to our blog service at the moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#6C3BAA] text-white rounded-lg hover:bg-[#5a3190] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div 
            className="text-center p-10 bg-[#6C3BAA]/5 rounded-2xl max-w-4xl mx-auto border border-[#6C3BAA]/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-3 text-[#6C3BAA]">No Articles Found</h3>
            <p className="text-[#2B2B2B]/70 mb-4">We couldn't find any articles matching your search criteria.</p>
            <button 
              className="px-6 py-3 bg-[#6C3BAA] text-white rounded-lg hover:bg-[#5a3190] transition-all duration-300"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </motion.div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 auto-rows-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  className={`${getSizeClass(post.size)} relative group`}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredId(post.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Card 
                    className={`w-full h-full overflow-hidden transition-all duration-500 ease-out border-0 shadow-lg
                      ${post.id === hoveredId ? 'shadow-xl scale-[0.98]' : 'shadow-md scale-100'}`}
                  >
                    <CardContent className="p-0 h-full">
                      <div 
                        className="p-6 h-full flex flex-col bg-gradient-to-br"
                        style={{ 
                          background: `linear-gradient(135deg, ${post.bgColor} 0%, ${post.bgColor}80 100%)`,
                          borderBottom: post.id === hoveredId ? `4px solid ${post.iconBg}` : 'none'
                        }}
                      >
                        <div className="flex flex-col h-full">
                          <div
                            className={`aspect-video mb-4 rounded-xl overflow-hidden relative
                                     ${post.size === 'large' ? 'md:w-1/2' : 'w-full'}`}
                          >
                            <div 
                              className="w-full h-full flex items-center justify-center"
                              style={{ backgroundColor: post.iconBg }}
                            >
                              <span className="text-white text-2xl font-bold">{post.iconText}</span>
                            </div>
                            <div 
                              className={cn(
                                "absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 transition-opacity duration-300",
                                post.id === hoveredId ? "opacity-100" : "opacity-0"
                              )}
                            >
                              <ArrowUpRight size={24} className="text-white" />
                            </div>
                          </div>
                          
                          <div className={`flex flex-col justify-between h-full ${post.size === 'large' && 'md:mt-4'}`}>
                            <div>
                              <div className="flex items-center mb-3">
                                <Tag size={14} className="mr-2 text-[#6C3BAA]" />
                                <span className="text-xs font-medium text-[#6C3BAA]">{post.category}</span>
                              </div>
                              <h3 
                                className={`font-bold mb-3 text-[#2B2B2B] transition-all duration-300
                                  ${post.size === 'large' ? 'text-xl md:text-2xl' : 'text-lg'} 
                                  ${post.id === hoveredId ? 'text-[#6C3BAA]' : 'text-[#2B2B2B]'}`}
                              >
                                {post.title}
                              </h3>
                              
                              {(post.size === 'large' || post.size === 'medium') && (
                                <p className="text-sm text-[#2B2B2B]/70 mb-4 line-clamp-3">{post.excerpt}</p>
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
                              
                              <Link to={`/blog/${post.slug}`}>
                                <motion.div
                                  className="group relative rounded-full w-10 h-10 bg-[#6C3BAA] flex items-center justify-center cursor-pointer overflow-hidden"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <motion.div
                                    className="absolute z-10"
                                    initial={{ rotate: 0 }}
                                    animate={post.id === hoveredId ? { rotate: 45 } : { rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <ArrowUpRight size={16} className="text-white" />
                                  </motion.div>
                                  <div className="absolute inset-0 bg-[#C08457] transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-left z-0"></div>
                                </motion.div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          
            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={cn(
                          "border border-[#6C3BAA]/20 bg-white hover:bg-[#6C3BAA]/5 transition-all duration-300",
                          currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                        )}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i} className="hidden md:block">
                        <PaginationLink 
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={cn(
                            "border transition-all duration-300",
                            currentPage === i + 1 
                              ? "border-[#6C3BAA] bg-[#6C3BAA] text-white" 
                              : "border-[#6C3BAA]/20 bg-white hover:bg-[#6C3BAA]/5"
                          )}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem className="md:hidden">
                      <span className="px-4 py-2">
                        {currentPage} / {totalPages}
                      </span>
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className={cn(
                          "border border-[#6C3BAA]/20 bg-white hover:bg-[#6C3BAA]/5 transition-all duration-300",
                          currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </motion.div>
            )}
          </div>
        )}
        
        {/* Newsletter Section */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#6C3BAA]/10 to-[#C08457]/10 backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#6C3BAA] to-[#C08457] bg-clip-text text-transparent">
              Stay Updated with Our Newsletter
            </h3>
            <p className="text-[#2B2B2B]/70 mb-8 max-w-2xl mx-auto">
              Get the latest insights, case studies, and waste management tips delivered directly to your inbox. No spam, just valuable content.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow md:flex-1 border-[#6C3BAA]/20 focus:border-[#6C3BAA] focus:ring-1 focus:ring-[#6C3BAA] bg-white/80 py-6"
              />
              <motion.button 
                className="group relative overflow-hidden bg-[#6C3BAA] px-6 py-3 rounded-lg text-white transition-all duration-500 flex items-center justify-center gap-2 hover:bg-[#5a3190]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Subscribe</span>
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-[#C08457] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blogs;


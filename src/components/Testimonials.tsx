
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "With Flagship, store managers can finally adjust VM based on sales data, quickly receive feedback from head office, and continually enhance our in-store guest experience.",
    name: "David Lee Wilson",
    title: "CEO at TechStart",
    logo: "TECH.START",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1000&auto=format&fit=crop",
    rating: 5
  },
  {
    quote: "The project management capabilities have transformed how we handle client work. Everything is streamlined and our team can collaborate effortlessly across different locations.",
    name: "Jennifer Page",
    title: "Project Manager",
    logo: "DESIGN.IO",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
    rating: 5
  },
  {
    quote: "The custom solutions they've built for us have directly contributed to our business growth. We've seen a 40% increase in customer engagement since implementation.",
    name: "Michael Thompson",
    title: "Marketing Director",
    logo: "GROW.DIGITAL",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    rating: 4
  },
  {
    quote: "Their attention to detail and commitment to quality is unmatched. The ongoing support we receive ensures our systems are always running optimally.",
    name: "Sarah Johnson",
    title: "Operations Lead",
    logo: "OPTIMAL.CO",
    image: "https://images.unsplash.com/photo-1577033169343-75fa11aa0a77?q=80&w=1000&auto=format&fit=crop",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const renderRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={isMobile ? 14 : 16}
            className={i < rating ? "text-[#C08457] fill-[#C08457]" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#F8F6F2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-wider text-[#6C3BAA] mb-2 block font-medium">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#2B2B2B]">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how our solutions have helped businesses across different industries achieve their goals.
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation arrows */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ml-2 sm:ml-4 md:-ml-6 lg:-ml-12">
            <motion.button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-[#2B2B2B] hover:bg-[#6C3BAA] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 mr-2 sm:mr-4 md:-mr-6 lg:-mr-12">
            <motion.button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-[#2B2B2B] hover:bg-[#6C3BAA] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          
          {/* Testimonial card */}
          <motion.div
            key={`testimonial-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
          >
            <div className="bg-[#FFF5F0] rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Logo and content section */}
                <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="text-lg sm:text-xl font-medium text-[#2B2B2B] mb-8">
                      {testimonials[activeIndex].logo}
                    </div>
                    <blockquote className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-[#2B2B2B] mb-8">
                      "{testimonials[activeIndex].quote}"
                    </blockquote>
                  </div>
                  
                  <div>
                    <p className="text-[#2B2B2B] font-bold">{testimonials[activeIndex].name}</p>
                    <p className="text-[#A89B91] mb-2">{testimonials[activeIndex].title}</p>
                    {renderRating(testimonials[activeIndex].rating)}
                  </div>
                </div>
                
                {/* Image section */}
                <div className="overflow-hidden bg-[#F8F6F2] hidden md:block">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={`${testimonials[activeIndex].name}'s testimonial`}
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: '400px' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 mx-1 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-[#6C3BAA] w-8" : "bg-[#A89B91] w-2"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

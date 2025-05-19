import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    phone: "+971",
    email: "",
    company: "",
    serviceType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setFormState((prevState) => {
      if (name === 'phone') {
        // Extract digits only
        const digitsOnly = value.replace(/\D/g, '');
        
        // Remove '971' if user types it manually
        const withoutPrefix = digitsOnly.startsWith('971')
          ? digitsOnly.slice(3)
          : digitsOnly;
  
        // Limit to 9 digits after the prefix
        const limitedDigits = withoutPrefix.slice(0, 9);
  
        // Only return +971 if digits are present
        const phone = limitedDigits ? `+971${limitedDigits}` : '';
  
        return {
          ...prevState,
          [name]: phone,
        };
      }
  
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          company: formState.company || undefined,
          serviceType: formState.serviceType,
          message: formState.message,
          status: 'new'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      // Clear form
      setFormState({
        name: "",
        phone: "+971",
        email: "",
        company: "",
        serviceType: "",
        message: "",
      });

      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-[#2B2B2B] text-white overflow-hidden" id="contact-us">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F8F6F2] to-transparent opacity-5"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#C08457]/20 blur-xl"></div>
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-[#6C3BAA]/10 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="text-[#C08457] text-sm uppercase tracking-wider mb-2 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Get in touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Ready to transform your business? Fill out the form below and one of our experts will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="flex flex-col justify-between"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div>
              <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">Ready for a cleaner tomorrow?</motion.h3>
              <motion.p variants={itemVariants} className="mb-8 text-gray-300">
                Join the many businesses that have already improved their operations with our services. Get in touch today and let's discuss how we can help you achieve your goals.
              </motion.p>
              
              <motion.div variants={containerVariants} className="flex flex-col space-y-14 mb-12">
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="bg-[#6C3BAA]/30 p-2 rounded-full mt-1">
                    <Mail className="h-5 w-5 text-[#C08457]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-300">info@clearsite.ae </p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="bg-[#6C3BAA]/30 p-2 rounded-full mt-1">
                    <Phone className="h-5 w-5 text-[#C08457]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-300">+971 565 422 555</p>
                    <p className="text-gray-300">+971 501 420 318</p>
                  </div>
                </motion.div>
{/*                 
                <motion.div variants={itemVariants} className="flex items-start space-x-4">
                  <div className="bg-[#6C3BAA]/30 p-2 rounded-full mt-1">
                    <MapPin className="h-5 w-5 text-[#C08457]" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <p className="text-gray-300">123 Business Ave, Suite 100<br />San Francisco, CA 94107</p>
                  </div>
                </motion.div> */}
              </motion.div>
            </div>
            
            {/* <motion.div variants={itemVariants} className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="bg-[#6C3BAA] hover:bg-[#5a3190] text-white border-none"
                >
                  Contact Us
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="bg-transparent text-white hover:bg-white/10 border-white"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div> */}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative"
          >
            
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
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 focus:border-[#6C3BAA] transition-colors"
                    placeholder="John Smith"
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
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 focus:border-[#6C3BAA] transition-colors"
                    placeholder="+971 50 123 4567"
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
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 focus:border-[#6C3BAA] transition-colors"
                    placeholder="john.smith@company.ae"
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
                    className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 focus:border-[#6C3BAA] transition-colors"
                    placeholder="Dubai Enterprises LLC"
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
                  className="bg-[#3a3a3a] border-[#4a4a4a] text-white rounded px-3 py-2 focus:border-[#6C3BAA] transition-colors w-full"
                  required
                >
                  <option value="">Choose your service</option>
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
                  className="bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-300 min-h-[120px] focus:border-[#6C3BAA] transition-colors"
                  placeholder="We need regular waste collection services for our office in Business Bay. Please provide details about your service packages."
                  required
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#6C3BAA] hover:bg-[#5a3190] text-white py-3 rounded-sm flex items-center justify-center space-x-2 transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>

              {submitStatus === 'success' && (
                <div className="text-green-400 text-center mt-4">
                  Thank you for your message. We will get back to you soon!
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="text-red-400 text-center mt-4">
                  {errorMessage || 'Failed to submit form. Please try again.'}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

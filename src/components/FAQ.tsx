
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FAQItem {
  question: string;
  answer: string;
  isOpen?: boolean;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "What types of waste do you handle?",
      answer: "We handle a wide range of waste types including construction debris, renovation waste, residential junk, commercial waste, yard waste, and more. Contact us for specific waste disposal needs.",
      isOpen: true
    },
    {
      question: "Do you offer same-day or emergency pickup?",
      answer: "Yes, we offer emergency pickup services when you need urgent waste removal. Our team can be dispatched quickly to address time-sensitive situations."
    },
    {
      question: "Are your services available across all areas of Dubai?",
      answer: "We serve all major areas in Dubai including Dubai Marina, JBR, Downtown Dubai, Business Bay, Jumeirah, Al Wasl, Umm Suqeim, Al Quoz, Al Barsha, Dubai Investments Park, Jebel Ali, Free Zones, Dubai Silicon Oasis, Academic City, Deira, Bur Dubai, Mirdif, Al Warqa, Rashidiya, Nad Al Sheba, Meydan, MBR City, Emirates Hills, Arabian Ranches, Damac Hills, and Tilal Al Ghaf."
    },
    {
      question: "How do I schedule a waste pickup or clearance service?",
      answer: "You can schedule a service by calling us, using our online booking form, or sending an email to orders@clearsite.ae with your details and requirements."
    },
    {
      question: "What are your operating hours?",
      answer: "Our regular operating hours are from 9AM to 7PM, Monday through Saturday. For emergency services, please contact our hotline."
    },
    {
      question: "Do you provide both residential and commercial services?",
      answer: "Yes, we offer waste management solutions for both residential and commercial clients, including contractors, construction companies, scrap yards, and homeowners."
    },
    {
      question: "Are your services compliant with Dubai Municipality regulations?",
      answer: "Absolutely. All our waste management services are fully compliant with Dubai Municipality regulations and environmental standards."
    },
    {
      question: "Can I set up recurring services for long-term projects?",
      answer: "Yes, we offer recurring service schedules for long-term projects. We can customize a waste management plan that fits your ongoing needs."
    },
    {
      question: "Is there a minimum or maximum load size?",
      answer: "We accommodate various load sizes from small residential cleanups to large construction site clearances. Contact us for specific requirements and we'll provide appropriate solutions."
    },
    {
      question: "How do you price your services?",
      answer: "Our pricing is transparent and based on factors such as waste type, volume, location, and service urgency. Contact us for a quote tailored to your specific needs."
    }
  ]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#F8F6F2] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C08457]/5 blur-3xl"></div>
      <div className="absolute bottom-20 -left-40 w-96 h-96 rounded-full bg-[#6C3BAA]/5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2B2B2B]">We've got the answers</h2>
        </motion.div>
        
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="mb-4"
            >
              <Collapsible
                open={openIndex === index}
                onOpenChange={() => toggleFAQ(index)}
                className="border-b border-gray-200 pb-4"
              >
                <div className="flex justify-between items-center">
                  <CollapsibleTrigger className="py-4 text-left text-lg font-medium w-full flex justify-between items-center text-[#2B2B2B]">
                    {faq.question}
                    <motion.div
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 flex-shrink-0"
                    >
                      {openIndex === index ? (
                        <X className="h-5 w-5 text-[#C08457]" />
                      ) : (
                        <Plus className="h-5 w-5 text-[#C08457]" />
                      )}
                    </motion.div>
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pl-0 pr-12 pb-4 text-[#2B2B2B]"
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;

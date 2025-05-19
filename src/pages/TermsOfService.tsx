import { motion } from "framer-motion";
import { 
  Globe, 
  FileText, 
  Shield, 
  Link, 
  AlertTriangle, 
  RefreshCw 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
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

  const terms = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Website Use",
      content: "Content is for informational purposes only and is subject to change without notice."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Service Requests",
      content: "All requests submitted through our website are subject to confirmation and availability. ClearSite reserves the right to accept or decline service requests."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Intellectual Property",
      content: "All website content (text, images, graphics) is owned by or licensed to ClearSite. Unauthorized reproduction is prohibited."
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Third-Party Links",
      content: "Our website may contain links to external sites. We are not responsible for the content or privacy practices of those sites."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Liability Disclaimer",
      content: "ClearSite is not liable for any indirect or consequential loss arising from the use of this website or services booked through it."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Changes to Terms",
      content: "ClearSite reserves the right to amend these terms at any time. Continued use of the website constitutes acceptance of the new terms."
    }
  ];

  return (
    <>
      <Navbar />
      
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#F8F6F2] overflow-hidden">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold mb-4 text-[#2B2B2B]">Terms of Service</h1>
            <p className="text-lg text-[#2B2B2B]/80">
              ClearSite.ae
            </p>
            <p className="text-sm text-[#2B2B2B]/60 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div 
            className="mb-12 bg-white p-8 rounded-lg shadow-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-lg text-[#2B2B2B]/80">
              By using www.clearsite.ae, you agree to the following terms and conditions:
            </p>
          </motion.div>

          {/* Terms Grid */}
          <div className="grid gap-6">
            {terms.map((term, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-[#6C3BAA] flex-shrink-0">
                    {term.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#2B2B2B]">
                      {index + 1}. {term.title}
                    </h3>
                    <p className="text-[#2B2B2B]/80">
                      {term.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-sm text-[#2B2B2B]/60">
              For any questions regarding these terms, please contact us at{" "}
              <a 
                href="mailto:info@clearsite.ae" 
                className="text-[#6C3BAA] hover:underline"
              >
                info@clearsite.ae
              </a>
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default TermsOfService; 
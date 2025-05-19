import { motion } from "framer-motion";
import { 
  Cookie, 
  Settings, 
  BarChart2, 
  CheckCircle, 
  Shield 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
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

  const cookieUses = [
    "To remember user preferences and form details.",
    "To track website traffic and performance through analytics tools (such as Google Analytics).",
    "To serve relevant ads (if applicable) through remarketing or retargeting tools."
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
            <h1 className="text-4xl font-bold mb-4 text-[#2B2B2B]">Cookies Policy</h1>
            <p className="text-lg text-[#2B2B2B]/80">
              ClearSite.ae
            </p>
            <p className="text-sm text-[#2B2B2B]/60 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </motion.div>

          {/* What Are Cookies Section */}
          <motion.div 
            className="mb-12 bg-white p-8 rounded-lg shadow-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start gap-4">
              <Cookie className="w-8 h-8 text-[#6C3BAA] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#2B2B2B]">What Are Cookies?</h2>
                <p className="text-[#2B2B2B]/80">
                  Cookies are small data files placed on your device to enhance your browsing experience and
                  collect information about how you interact with our site.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How We Use Cookies Section */}
          <motion.div 
            className="mb-12"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#2B2B2B]">How We Use Cookies</h2>
            <div className="space-y-4">
              {cookieUses.map((use, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm"
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <BarChart2 className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                  <span className="text-[#2B2B2B]/80">{use}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Managing Cookies Section */}
          <motion.div 
            className="mb-12 bg-white p-8 rounded-lg shadow-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start gap-4">
              <Settings className="w-8 h-8 text-[#6C3BAA] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#2B2B2B]">Managing Cookies</h2>
                <p className="text-[#2B2B2B]/80">
                  You can control or delete cookies via your browser settings. Restricting cookies may impact
                  website functionality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Consent Section */}
          <motion.div 
            className="bg-gradient-to-r from-[#6C3BAA]/10 to-[#6C3BAA]/5 p-8 rounded-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[#6C3BAA] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-4 text-[#2B2B2B]">Consent</h2>
                <p className="text-[#2B2B2B]/80">
                  By continuing to use our site, you consent to our use of cookies as described in this policy.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-sm text-[#2B2B2B]/60">
              For any questions regarding our cookies policy, please contact us at{" "}
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

export default CookiesPolicy; 
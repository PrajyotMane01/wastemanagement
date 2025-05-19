import { motion } from "framer-motion";
import { Shield, Lock, Cookie, Mail, Link } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
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
          {/* Terms & Conditions Section */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold mb-8 text-[#2B2B2B]">Terms & Conditions</h1>
            <p className="text-lg text-[#2B2B2B]/80 mb-8">
              By using this website, you agree to comply with and be bound by the
              following terms and conditions. These terms apply to all visitors, users, and others who access
              or use the website.
            </p>

            <div className="space-y-6">
              {[
                "The content on this website is for general information only and is subject to change without notice.",
                "Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.",
                "From time to time, this website may include links to other websites. These links are provided for your convenience to provide further information. They do not signify endorsement and we have no responsibility for the content of linked websites.",
                "Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.",
                "ClearSite reserves the right to update or change these terms at any time without prior notice. Continued use of the website means you accept those changes."
              ].map((term, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm"
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <Shield className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                  <span className="text-[#2B2B2B]/80">{term}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Privacy Policy Section */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-8 text-[#2B2B2B]">Privacy Policy</h2>
            <p className="text-lg text-[#2B2B2B]/80 mb-8">
              This Privacy Policy outlines how ClearSite collects, uses, and protects any
              information that you give while using this website.
            </p>

            {/* What We Collect */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-[#2B2B2B]">What We Collect</h3>
              <p className="text-[#2B2B2B]/80 mb-4">
                We may collect the following information through forms and browsing activity:
              </p>
              <div className="space-y-4">
                {[
                  "Name, contact information including email address",
                  "Demographic information such as location and preferences",
                  "IP address, browser type, and referring pages"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <Lock className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                    <span className="text-[#2B2B2B]/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What We Do With the Information */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-[#2B2B2B]">What We Do With the Information</h3>
              <p className="text-[#2B2B2B]/80 mb-4">The data collected is used to:</p>
              <div className="space-y-4">
                {[
                  "Improve our services and website functionality",
                  "Respond to inquiries and process service requests",
                  "Send periodic emails about updates or offers (only with consent)"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <Link className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                    <span className="text-[#2B2B2B]/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-[#2B2B2B]">Security</h3>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-[#2B2B2B]/80">
                  We are committed to ensuring your information is secure. Appropriate measures have
                  been implemented to prevent unauthorized access or disclosure.
                </p>
              </motion.div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-[#2B2B2B]">Cookies</h3>
              <motion.div
                className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <Cookie className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                <p className="text-[#2B2B2B]/80">
                  This site uses cookies to analyze traffic and improve user experience. You can choose
                  to accept or decline cookies via your browser settings.
                </p>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-[#2B2B2B]">Controlling Your Personal Information</h3>
              <motion.div
                className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                <Mail className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                <p className="text-[#2B2B2B]/80">
                  You may request details of personal information held about you or request removal by contacting{" "}
                  <a href="mailto:info@clearsite.ae" className="text-[#6C3BAA] hover:underline">
                    info@clearsite.ae
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Final Note */}
            <motion.div
              className="bg-gradient-to-r from-[#6C3BAA]/10 to-[#6C3BAA]/5 p-6 rounded-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-[#2B2B2B]/80">
                ClearSite reserves the right to update this policy from time to time. Please check this page
                periodically to ensure you agree with any changes.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default TermsAndConditions; 
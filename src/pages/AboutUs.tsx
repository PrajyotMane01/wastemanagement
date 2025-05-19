import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Leaf, Clock, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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

  const stats = [
    { icon: <Leaf className="w-8 h-8" />, value: "90%", label: "Recycling Rate" },
    { icon: <Clock className="w-8 h-8" />, value: "24/7", label: "Service Available" },
    { icon: <Shield className="w-8 h-8" />, value: "100%", label: "Compliance Rate" },
    { icon: <Users className="w-8 h-8" />, value: "500+", label: "Happy Clients" },
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        className="relative h-[60vh] bg-[#6C3BAA] overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#6C3BAA]/90 to-[#6C3BAA]/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About ClearSite
          </motion.h1>
        </div>
      </motion.div>

      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#F8F6F2] overflow-hidden">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Mission Statement with Floating Animation */}
          <motion.div 
            className="mb-16 relative"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#6C3BAA]/10 rounded-full blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#6C3BAA]/10 rounded-full blur-xl" />
            <h2 className="text-4xl font-bold mb-6 text-[#2B2B2B]">Our Mission</h2>
            <p className="text-lg text-[#2B2B2B]/80 leading-relaxed">
              At ClearSite, our mission is simple: to create cleaner, safer, and more efficient spaces through
              reliable waste management and site clearance solutions. We are committed to sustainability,
              speed, and service excellence in every project we undertake.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-[#6C3BAA] mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#2B2B2B] mb-2">{stat.value}</div>
                <div className="text-sm text-[#2B2B2B]/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* What Sets Us Apart */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#2B2B2B]">What Sets Us Apart</h2>
            <ul className="space-y-4">
              {[
                "Fast, on-call services tailored for construction, renovation, and commercial sites",
                "Environmentally responsible practices with a focus on recycling and minimal landfill use",
                "A dedicated team that treats every job site like it's our own",
                "Transparent pricing and no hidden fees"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <CheckCircle className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                  <span className="text-[#2B2B2B]/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Promise */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-6 text-[#2B2B2B]">Our Promise to Customers</h2>
            <ul className="space-y-4">
              {[
                "We show up when we say we will",
                "We leave your site clean, compliant, and ready for the next stage",
                "We work with urgency, care, and accountability",
                "We're in and out of your site with swift, efficient execution that keeps your project on schedule"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm"
                  variants={itemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <CheckCircle className="w-6 h-6 text-[#6C3BAA] flex-shrink-0 mt-1" />
                  <span className="text-[#2B2B2B]/80">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Closing Statement with Gradient Background */}
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gradient-to-r from-[#6C3BAA]/10 to-[#6C3BAA]/5"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-lg text-[#2B2B2B]/80 italic">
              ClearSite is more than a waste removal service — we're your cleanup partner, helping you keep
              your operations running smoothly and your sites hazard-free.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs; 
import { motion } from "framer-motion";
import { Zap, Recycle, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fast Response",
      description: "We're ready when you are — no delays, no excuses.",
      icon: <Zap className="h-6 w-6 text-[#6C3BAA]" />,
      image: "/hero-image-1.png",
    },
    {
      title: "Eco-Conscious Disposal",
      description: "Committed to recycling, landfill reduction, and sustainable practices.",
      icon: <Recycle className="h-6 w-6 text-[#6C3BAA]" />,
      image: "/hero-image-2.png",
    },
    {
      title: "Professional & Compliant",
      description: "Fully licensed, trained, and aligned with Dubai Municipality standards.",
      icon: <ShieldCheck className="h-6 w-6 text-[#6C3BAA]" />,
      image: "/hero-image-1.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#2B2B2B]">Why Choose Us</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => {
          const isLastItem = index === features.length - 1;

          return (
            <motion.div
              key={index}
              className={`flex flex-col ${
                isLastItem ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""
              }`}
              variants={itemVariants}
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="bg-[#F3EFFF] p-3 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2B2B2B]">{feature.title}</h3>
                  <p className="text-[#2B2B2B] mt-1">{feature.description}</p>
                </div>
              </div>

              <Card className="overflow-hidden mt-auto bg-[#A89B91] border-none">
                <CardContent className="p-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-40 object-cover"
                  />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;

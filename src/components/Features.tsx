
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      name: "Feature name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-24">
          <path d="M60 30C43.4315 30 30 43.4315 30 60C30 76.5685 43.4315 90 60 90C76.5685 90 90 76.5685 90 60C90 43.4315 76.5685 30 60 30ZM60 50C55.5817 50 52 53.5817 52 58C52 62.4183 55.5817 66 60 66C64.4183 66 68 62.4183 68 58C68 53.5817 64.4183 50 60 50Z" stroke="#333" strokeWidth="2" />
        </svg>
      ),
    },
    {
      name: "Feature name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-24">
          <path d="M90 40L70 60M70 60L90 80M70 60H30" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Feature name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-24">
          <circle cx="60" cy="60" r="30" stroke="#333" strokeWidth="2" />
          <path d="M60 40V60L75 75" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Feature name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24 w-24">
          <path d="M40 40H80V80H40V40Z" stroke="#333" strokeWidth="2" />
          <path d="M50 50H70V70H50V50Z" stroke="#333" strokeWidth="2" />
          <path d="M30 30H90V90H30V30Z" stroke="#333" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-white" id="about-us">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold">Features</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            viewport={{ once: true }}
          >
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
            <a href="#" className="text-[#6B5D44] text-sm font-medium hover:underline">To use</a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;

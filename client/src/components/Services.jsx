import React from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion"; // Import Framer Motion
import image1 from "../assets/images/image1.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image2 from "../assets/images/image2.jpg";

// Animation variants for the service cards
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 }, // Start state (before it is in view)
  visible: { opacity: 1, scale: 1 }, // End state (when it is in view)
};

const Services = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-y-8">
      <h3 className="text-6xl text-white text-center md:text-left">Services</h3>

      {/* Staggered container for service cards */}
      <div className="flex flex-col mx-2 gap-y-8 xl:mx-0 justify-between items-center md:flex-row gap-x-4">
        {/* Service Cards with animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }} // Animation will trigger when it comes into view
          viewport={{ amount: 0.2 }} // Re-triggers the animation when 20% of the card is in view
          transition={{ duration: 1 }} // Control the speed of the animation
          whileHover={{ scale: 1.05 }} // Hover effect
        >
          <ServiceCard image={image3} para_text="Tools For Traders" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }} // Animation will trigger when it comes into view
          viewport={{ amount: 0.2 }} // Ensures animation re-triggers each time it enters the view
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }} // Hover effect
        >
          <ServiceCard image={image4} para_text="Custom Development" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }} // Animation will trigger when it comes into view
          viewport={{ amount: 0.2 }} // Ensures animation re-triggers each time it enters the view
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }} // Hover effect
        >
          <ServiceCard image={image1} para_text="Training & Workshops" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }} // Animation will trigger when it comes into view
          viewport={{ amount: 0.2 }} // Ensures animation re-triggers each time it enters the view
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }} // Hover effect
        >
          <ServiceCard image={image2} para_text="Consultancy Soon!" />
        </motion.div>
      </div>
    </div>
  );
};

export default Services;

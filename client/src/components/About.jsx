import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full h-fit text-white my-40 px-10">
      {/* Heading Animation */}
      <motion.h3
        className="text-6xl text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h3>
      {/* Mission Section Animation */}
      <motion.div
        className="w-full text-center text-2xl mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        We are a group of individuals dedicated to making your trading journey
        profitable and empowering you to achieve financial freedom.
      </motion.div>
      {/* Vision Statement */}
      <motion.div
        className="w-full text-center text-xl mb-6"
        initial={{ opacity: 0, x: -100, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our mission is to provide the best resources and mentorship for traders
        of all levels, helping them navigate the markets with confidence.
      </motion.div>
      {/* Core Values */}
      <motion.div
        className="w-full text-center text-xl mb-6"
        initial={{ opacity: 0, x: 100, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
      >
        We believe in transparency, trust, and continuous learning, offering
        comprehensive guides, technical analysis, and real-time support.
      </motion.div>
      {/* Call to Action
      <motion.div
        className="w-full text-center text-lg mt-10"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Join us today and start your journey toward a profitable trading career!
      </motion.div> */}
    </div>
  );
};

export default About;

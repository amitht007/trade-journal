import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Records from "../components/Records.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import siteVid from "../assets/siteVid.gif";
import Calendar from "../components/Calendar";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import Navbar from "../components/Navbar.jsx";
import About from "../components/About.jsx";
import FAQ from "../components/Faq.jsx";
import Services from "../components/Services.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import LoginPage from "./LoginPage.jsx";

const DemoLand = () => {
  const triggerToast = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const triggerToastWarn = (message) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <ReactLenis
      root
      options={{ smoothTouch: true }}
      className="w-full h-screen"
    >
      {/* Header */}
      <Navbar />
      <div className="w-full text-white fixed bottom-4 left-4 flex ">
        <div className="flex flex-col gap-y-6 py-4 z-40">
          <a
            href="https://x.com/knightHeadHouse"
            className="p-2 w-10 text-center rounded-[200px] bg-[#464646] hover:bg-[#686868]"
          >
            X
          </a>
          <a
            href="https://x.com/knightHeadHouse"
            className="p-2 w-10 text-center rounded-[200px] bg-[#464646] hover:bg-[#686868]"
          >
            X
          </a>{" "}
          <a
            href="https://x.com/knightHeadHouse"
            className="p-2 w-10 text-center rounded-[200px] bg-[#464646] hover:bg-[#686868]"
          >
            X
          </a>{" "}
        </div>
      </div>

      <div className="bg-black flex h-auto w-full justify-around pt-16">
        <div className="bg-gradient-to-tr bg-black w-[1400px] overflow-x-hidden">
          <div className="w-[1400px]">
            {/* Two-column Grid for Records and Image */}
            <div className="grid grid-cols-2 gap-[0px] w-full h-auto relative">
              {/* Second Column: Image */}
              <div className="border-black bg-black w-full h-auto flex justify-center py-6">
                {/* <img
                  src={siteVid}
                  alt="My SVG"
                  loading="lazy"
                  className="rounded-lg z-40 border-2 border-black sm:min-w-[300px] sm:h-[200px] md:w-[500px] md:h-[200px] lg:w-[550px] lg:h-[350px]"
                /> */}
                <motion.h1
                  initial={{ opacity: 0, x: -100, y: -50 }} // Starting opacity (before entering viewport)
                  animate={{ opacity: 1, x: 0, y: 0 }} // Target opacity (after entering viewport)
                  transition={{ duration: 1 }} // Duration of the animation
                  whileInView={{ opacity: 1 }} // Ensure opacity remains at 1 when visible
                  viewport={{ once: true, amount: 1 }} // Trigger animation when 50% of the component is in view
                  className=" text-8xl z-10 text-[#e1e1e1]"
                >
                  Make Your Life Easier, With Our Zero Cost Services.
                </motion.h1>
                <div className="bg-[#110f0f] w-[600px] h-[400px] blur-[500px] absolute top-4 left-8 -z-0 rounded-full"></div>
              </div>

              {/* First Column: Records Component */}
              <div className="border-black bg-black w-full h-full flex justify-center py-6">
                <motion.div
                  initial={{ opacity: 0, x: 100, y: -50 }} // Starting opacity (before entering viewport)
                  animate={{ opacity: 1, x: 0, y: 0 }} // Target opacity (after entering viewport)
                  transition={{ duration: 1 }} // Duration of the animation
                  whileInView={{ opacity: 1 }} // Ensure opacity remains at 1 when visible
                  viewport={{ once: true, amount: 1 }} // Trigger animation when 50% of the component is in view
                  className="space-y-4 z-10"
                >
                  <h3 className=" text-white text-5xl font-semibold p-3 text-left tracking-widest">
                    Take Your Notes Here
                  </h3>
                  <Records
                    triggerToast={triggerToast}
                    triggerToastWarn={triggerToastWarn}
                  />
                </motion.div>
                <div className="bg-[#110f0f] w-[600px] h-[400px] blur-3xl absolute top-4 left-8 -z-0 rounded-full"></div>
              </div>
            </div>
            {/* Calendar Section */}
            <div className="snap-always z-50 snap-center bg-black w-full flex flex-col my-40">
              <motion.div
                initial={{ opacity: 0 }} // Starting opacity (before entering viewport)
                animate={{ opacity: 1 }} // Target opacity (after entering viewport)
                transition={{ duration: 2 }} // Duration of the animation
                whileInView={{ opacity: 1 }} // Ensure opacity remains at 1 when visible
                viewport={{ once: false, amount: 0.2 }} // Trigger animation when 50% of the component is in view
                id="section2"
                className="relative"
              >
                <Calendar />
              </motion.div>
            </div>
          </div>
          {/* Services Section */}
          <Services />

          {/* About Section */}
          <About />

          <div className="w-full h-fit flex justify-around mb-20">
            {/* Animated Login Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} // Initial state
              whileInView={{ opacity: 1, scale: 1 }} // Animate when in view
              viewport={{ amount: 0.2 }} // Re-triggers when 20% of the element is visible
              transition={{ duration: 0.5 }} // Control the animation speed
              whileHover={{ scale: 1.05 }} // Hover effect
            >
              <Link
                to="/login"
                className="bg-white text-black text-center rounded-3xl p-4 flex justify-around text-2xl font-bold w-[300px]"
              >
                Log in
              </Link>
            </motion.div>

            {/* Animated Sign Up Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} // Initial state
              whileInView={{ opacity: 1, scale: 1 }} // Animate when in view
              viewport={{ amount: 0.2 }} // Re-triggers when 20% of the element is visible
              transition={{ duration: 0.5 }} // Control the animation speed
              whileHover={{ scale: 1.05 }} // Hover effect
            >
              <Link
                to="/register"
                className="bg-white text-black text-center rounded-3xl p-4 flex justify-around text-2xl font-bold w-[300px]"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>

          {/* Toast Notifications */}
          <ToastContainer />
        </div>
      </div>

      {/* </div> */}
    </ReactLenis>
  );
};

export default DemoLand;

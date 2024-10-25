import React, { useEffect, useRef } from "react";
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
import { ScrollTrigger } from "gsap/all";
import Navbar from "../components/Navbar.jsx";
import About from "../components/About.jsx";
import FAQ from "../components/Faq.jsx";
import Services from "../components/Services.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import LoginPage from "./LoginPage.jsx";

const DemoLand = () => {
  const aboutRef = useRef(null);
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
      <Navbar aboutRef={aboutRef} />
      <div className="hidden w-full text-white fixed bottom-4 left-4 xl:flex ">
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
          <div className="xl:w-[1400px]">
            {/* Two-column Grid for Records and Image */}
            <div className="xl:grid xl:grid-cols-2 xl:gap-[0px] w-full h-auto xl:relative">
              {/* Second Column: Image */}
              <div className="border-black xl:text-left text-center bg-black w-full h-auto flex justify-around xl:justify-center py-6">
                <motion.h1
                  initial={{ opacity: 0, x: -100, y: -50 }} // Starting opacity (before entering viewport)
                  animate={{ opacity: 1, x: 0, y: 0 }} // Target opacity (after entering viewport)
                  transition={{ duration: 1 }} // Duration of the animation
                  whileInView={{ opacity: 1 }} // Ensure opacity remains at 1 when visible
                  viewport={{ once: true, amount: 1 }} // Trigger animation when 50% of the component is in view
                  className="px-2 xl:px-0 text-4xl md:text-5xl  xl:text-8xl z-10 text-[#e1e1e1]"
                >
                  Make Your Life Easier, With Our Trading Solutions!
                </motion.h1>
                <div className=" xl:flex bg-[#110f0f] w-[600px] h-[400px] blur-[500px] absolute top-4 left-8 -z-0 rounded-full"></div>
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
                  <h3 className=" text-white text-center text-2xl md:text-5xl font-semibold p-3 md:text-left tracking-widest">
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
            <div className="hidden snap-always z-50 snap-center bg-black w-full xl:flex flex-col my-40">
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
          <div id="about-section" ref={aboutRef}>
            <About />
          </div>
          <div className="w-full h-fit flex flex-col justify-center items-center sm:justify-around mb-6">
            {/* <div className="w-full h-screen flex flex-col items-center justify-center sm:flex-row sm:justify-around mb-20">
             */}
            {/* Call to Action */}
            <motion.div
              className="w-full text-2xl text-center  mb-10 px-4 text-white"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              Join us today and start your journey toward a profitable trading
              career!
            </motion.div>

            <div className="w-[75%] h-fit flex flex-col justify-center align-center sm:flex-row sm:justify-evenly  mb-20">
              {/* Animated Login Button */}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} // Initial state
                whileInView={{ opacity: 1, scale: 1 }} // Animate when in view
                viewport={{ amount: 0.2 }} // Re-triggers when 20% of the element is visible
                transition={{ duration: 0.5 }} // Control the animation speed
                whileHover={{ scale: 1.05 }} // Hover effect
                className="mb-4"
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

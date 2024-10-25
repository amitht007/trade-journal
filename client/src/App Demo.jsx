import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import "./index.css";
import Records from "./components/Records";
import Footer from "./components/Footer";
import PLCalendar from "./components/Calendar";
import Dashboard from "./components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import siteVid from "./assets/siteVid.gif";
import pencil0 from "./assets/pencil0.svg";
import rupee0 from "./assets/rupee0.svg";
import page0 from "./assets/page0.svg";
import scribble from "./assets/scribble.svg";
import Calendar from "./components/Calendar";
import download from "./assets/download.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const recordsRef = useRef(null);

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
      className="snap-y snap-mandatory overflow-y flex-col space-y-4 bg-gradient-to-b overflow-x-hidden"
    >
      <div className="bg-slate-100 z-50 text-center font-bold text-4xl py-4 text-black shadow-md sticky top-0">
        <h3 className=" drop-shadow-lg">Take Notes Instantly!</h3>{" "}
      </div>
      <div className="snap-always snap-center min-width-[50%] sticky top-[20%] left-[50%] h-screen">
        <img
          src={siteVid}
          alt="My SVG"
          loading="lazy"
          className="absolute left-[50%] rounded-lg z-50  border-2 border-black shadow-gray-400 shadow-lg sm:min-w-[300px] sm:h-[200px] md:w-[500px] md:h-[200px] lg:w-[550px] lg:h-[350px]"
        />
      </div>
      <div className="w-full h-full absolute top-6 -z-10 overflow-hidden">
        <div className="absolute blur-[3px]	top-[20%] left-[20%] ">
          <img src={pencil0} className="w-[50px] h-[40px] " />
        </div>
        <div className="absolute blur-[1px]	-rotate-45 top-[6%] left-[50%] ">
          <img src={page0} className="w-[50px] h-[40px] " />
        </div>
        <div className="absolute blur-[1px] top-[170px] right-[20px]">
          <img src={pencil0} className="w-[80px] h-[100px] " />
        </div>
        <div className="absolute blur-[3px]	 top-[180px] left-[20px] transform scale-x-[-1]">
          <img src={pencil0} className="w-[100px] h-[100px] " />
        </div>
        <div className="absolute blur-[1px] w-full h-full	 top-[40px] transform scale-x-[-1]">
          <img src={scribble} className="w-[30%] h-[60px] " />
        </div>
        <div className="absolute blur-[2px] w-full h-full	 top-[30%] items-center ">
          <img src={scribble} className="w-[20%] h-[20%] " />
        </div>

        <div className="absolute blur-[3px]	top-[180px] left-[20px] transform scale-x-[-1]">
          <img src={pencil0} className="w-[100px] h-[100px] " />
        </div>

        <div className="absolute blur-[3px]	 top-[500px] left-[120px] rotate-45  ">
          <img src={rupee0} className="w-[100px] h-[100px] " />
        </div>

        <div className="absolute blur-[3px]	 top-[300px] left-[800px] rotate-45  ">
          <img src={rupee0} className="w-[100px] h-[100px] " />
        </div>

        <div className="w-full  absolute blur-[3px] left-[50%] top-[400px]	items-center rotate-0 ">
          <img src={rupee0} className="w-[100px] h-[100px] " />
        </div>
      </div>

      <div
        className="snap-always snap-center w-full z-40 left-[10%] h-screen "
        id="section1"
      >
        <div className=" section absolute flex justify-center top-[25%] left-[25%] rounded-lg z-60 scale-125 items-center p-1 space-y-2">
          <div className="place-content-center text-center">
            <p className="text-4xl ">Have Trouble</p>
            <p className="text-5xl"> Journalling</p>
            <p className="text-5xl">Start Here!</p>
            <div class="hover:cursor-pointer w-auto h-auto flex justify-center flex-col items-center mt-6 bg-blue-200 p-2 rounded-lg">
              <p class="drop-shadow-md text-blue-950 font-bold hover:cursor-pointer">
                DOWNLOAD EXTENSION FROM HERE!
              </p>
              <img src={download} class=" hover:cursor-pointer w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="snap-always snap-center w-full h-screen flex flex-col gap-y-20"
        id="section2"
      >
        <div className="relative left-[15%] z-50  border-black">
          <Records
            triggerToast={triggerToast}
            triggerToastWarn={triggerToastWarn}
          />
        </div>
        <div className=" relative">
          <Calendar />
        </div>{" "}
      </div>

      <div className="snap-always snap-center  w-full h-1/2">
        <div className=" relative ">
          <Dashboard />
        </div>
      </div>
      <div className=" relative  top-40">
        <Footer />
      </div>
      <ToastContainer />
    </ReactLenis>
  );
};

export default App;

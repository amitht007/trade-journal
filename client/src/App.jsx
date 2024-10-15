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
import LoginPage from "./pages/LoginPage";

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
    <ReactLenis root options={{ smoothTouch: true }}>
      <ToastContainer />

      <LoginPage />
      <div>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default App;

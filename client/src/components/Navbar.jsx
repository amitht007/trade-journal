import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authSignal from "../store/authStore";

const Navbar = ({ aboutRef }) => {
  const navigate = useNavigate();
  const signal = authSignal((state) => state.signal);
  const setSignal = authSignal((state) => state.setSignal);

  const handleLogout = () => {
    Cookies.remove("__Secure-authToken"); // Removes the auth token cookie
    setSignal(false);
    navigate("/login"); // Redirect to login page
  };

  // Scroll to About section
  const scrollToAbout = () => {
    if (aboutRef && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black z-50 font-bold p-4 text-white shadow-md sticky top-0 flex justify-between items-center tracking-wide">
      {/* Navbar Brand */}
      <div className="flex items-center gap-x-10">
        <Link to="/" className="text-4xl">
          KnightX
        </Link>
        <div className="hidden md:flex gap-x-8">
          <Link to="/">Business</Link>
          <button onClick={scrollToAbout} className="cursor-pointer">
            About
          </button>
        </div>
      </div>

      {/* Conditional Navbar Items */}
      <div className="flex items-center gap-x-6">
        {signal ? (
          <>
            <Link
              to="/dashboard"
              className="bg-white p-2 rounded-3xl text-black"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-white p-2 rounded-3xl tracking-wide hover:bg-gray-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="bg-white p-2 hidden lg:flex rounded-3xl text-black"
            >
              Extensions
            </Link>
            {/* <Link to="/help" className="hidden lg:flex">
              Help
            </Link> */}
            <Link to="/login" className="hover:underline">
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-white text-black rounded-3xl p-2"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

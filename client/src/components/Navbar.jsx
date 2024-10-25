import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authSignal from "../store/authStore";
const Navbar = () => {
  const navigate = useNavigate();
  console.log(Cookies.get("__Secure-authToken"));
  const signal = authSignal((state) => state.signal);
  const setSignal = authSignal((state) => state.setSignal);

  const handleLogout = () => {
    // Clear the cookie on logout
    setSignal(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="bg-[#000000] z-50 font-bold p-4 text-white shadow-md sticky top-0 flex justify-between tracking-wide">
      {/* Navbar Brand */}
      <div className="flex items-center gap-x-10">
        <Link to="/" className="text-4xl">
          KnightX
        </Link>
        <div className="flex gap-x-8">
          <Link to="/">Business</Link>
          <Link to="/">About</Link>
        </div>
      </div>

      {/* Conditional Navbar Items */}
      <div className="flex items-center gap-x-10">
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
              className=" text-white rounded-3xl p-2 tracking-widest"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="bg-white p-2 rounded-3xl text-black">
              Extensions
            </Link>
            <Link to="/help">Help</Link>
            <Link to="/login">Log in</Link>
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

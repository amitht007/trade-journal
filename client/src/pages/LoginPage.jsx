import React, { useState } from "react";
import axios from "axios";
import bull from "../assets/bull.svg";
import { useNavigate } from "react-router-dom"; // Make sure to import this to handle navigation
import authSignal from "../store/authStore";
import Navbar from "../components/Navbar";
const LoginPage = () => {
  const [email, setEmail] = useState(""); // Change state to handle email
  const [password, setPassword] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const signal = authSignal((state) => state.signal);
  const setSignal = authSignal((state) => state.setSignal);

  const navigate = useNavigate(); // Add navigate for routing

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission
    setErrorMessage(""); // Reset any previous error message

    // Validate email and password fields
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    if (!isHuman) {
      setErrorMessage("Please confirm you are a human!");
      return;
    }

    try {
      setLoading(true); // Set loading state to true

      const response = await axios.post(
        "http://localhost:5000/api/users/login", // Backend endpoint
        {
          email, // Send email instead of username
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSignal(true);
        navigate("/homepage"); // Navigate to homepage on success
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="bg-grainy w-full h-screen bg-gradient-to-tr from-[#000000] via-[#161516] to-[#272524] flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr] gap-10 w-full h-auto align-middle">
          {/* First Column with Heading/Logo */}
          <div className="flex flex-col justify-center items-end text-right h-full">
            <div>
              <div className="relative w-[700px] mb-4">
                <div className="absolute bg-[#0000008f] h-[50px] w-[680px] blur-lg"></div>
                <div>
                  <h2 className="text-6xl font-bold text-white drop-shadow-xl">
                    Welcome Back, Trader!
                  </h2>
                  <p className="text-[#8e8e8e]">
                    We are there where is no one!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <img src={bull} className="w-[300px] h-[300px]" alt="Bull Logo" />
            </div>
          </div>

          {/* Second Column with Form */}
          <div className="w-[75%] h-full">
            <h3 className="text-4xl text-left w-full font-bold text-white mb-6 tracking-widest">
              LOGIN
            </h3>
            <form
              className="flex flex-col gap-6 w-full text-left"
              onSubmit={handleLogin}
            >
              <input
                className={`${
                  !email.length ? "glowing-input" : ""
                } h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="EMAIL"
                type="email" // Change to type email
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={`${
                  !password.length && email.length ? "glowing-input" : ""
                } h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="PASSWORD"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex w-full justify-between my-4">
                <div
                  className="text-white flex gap-x-4 items-center w-full hover:cursor-pointer"
                  onClick={() => {
                    setIsHuman(!isHuman);
                  }}
                >
                  <input
                    type="checkbox"
                    id="human-check-box"
                    checked={isHuman}
                    onClick={() => {
                      setIsHuman(!isHuman);
                    }}
                    className={`${
                      !isHuman && password.length ? "glowing-input" : ""
                    } h-[20px] w-[20px] hover:cursor-pointer`}
                  />
                  <p className="text-[#a1a1a1]">
                    If you are a human, check this box.
                  </p>
                </div>
                <h3 className="w-full text-2xl text-[#d0d0d0] hover:cursor-pointer text-right tracking-widest">
                  Forgot Password!
                </h3>
              </div>

              {/* Display error message */}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              {/* Submit button */}
              <button
                type="submit"
                className={`${
                  isHuman ? "glowing-input" : ""
                } h-[60px] bg-[#c2c2c0] text-3xl font-bold tracking-wider text-black hover:bg-gray-500 transition duration-300`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

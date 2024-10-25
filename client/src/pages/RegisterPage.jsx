import React, { useState } from "react";
import bull from "../assets/bull.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const [username, setUsername] = useState(""); // Username state added
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isHuman, setIsHuman] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password match check
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send request to the local server endpoint
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username, // Include username in the request
          email,
          password,
        }
      );

      console.log("Registration successful", response.data);

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Error during registration", err);
      setError("Registration failed, please try again.");
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="bg-grainy w-full h-screen bg-gradient-to-tr from-[#000000] via-[#161516] to-[#272524] flex items-center justify-center pb-40">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr] gap-10 w-full h-auto align-middle ">
          {/* First Column with Heading/Logo */}
          <div className="text-center flex flex-col justify-center items-end lg:text-right h-full pt-40 lg:pt-0">
            <div>
              <div className="relative xl:w-[700px] mb-4">
                <div className="hidden xl:flex absolute bg-[#0000008f] h-[50px] w-[680px] blur-lg"></div>
                <div>
                  <h2 className="text-6xl font-bold text-white drop-shadow-xl">
                    Welcome Back, Trader!
                  </h2>
                  <p className="text-[#8e8e8e]">
                    We are there, where there is no one!
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex justify-center w-full">
              <img src={bull} className="w-[300px] h-[300px]" alt="Bull Logo" />
            </div>
          </div>

          {/* Second Column with Form */}
          <div className="lg:w-[75%] h-full place-items-center px-4 lg:px-0">
            <h3 className="text-4xl text-left w-full font-bold text-white mb-6 tracking-widest">
              REGISTER
            </h3>
            <form
              className="flex flex-col gap-6 w-full text-left"
              onSubmit={handleRegister}
            >
              {/* Username */}
              <input
                className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              {/* Email */}
              <input
                className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tom@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password */}
              <input
                className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="PASSWORD"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Confirm Password */}
              <input
                className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CONFIRM PASSWORD"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Error Message */}
              {error && <p className="text-red-500 text-xl">{error}</p>}

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
              {/* Register Button */}
              <button
                type="submit"
                className="h-[60px] bg-[#c2c2c0] text-3xl font-bold tracking-wider text-black hover:bg-gray-500 transition duration-300"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

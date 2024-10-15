import React, { useState } from "react";
import bull from "../assets/bull.svg";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (
    <div className="bg-grainy w-full h-screen bg-gradient-to-tr from-[#100f0f] via-[#252324] to-[#4d4b49] flex items-center justify-center">
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
                <p className="text-[#8e8e8e]">We are there where is no one!</p>
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
            REGISTER
          </h3>
          <form className="flex flex-col gap-6 w-full text-left">
            <input
              className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tom@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="h-[60px] bg-[#1b191a] p-4 text-2xl font-bold tracking-wider text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PASSWORD"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h3 className="w-full text-2xl text-[#d0d0d0] hover:cursor-pointer ">
              Forgot Password!
            </h3>
            <div className="text-white flex gap-x-4 items-center">
              <input type="checkbox" className="h-[20px] w-[20px]" />
              <p className="text-[#a1a1a1]">
                If you are a human, check this box.
              </p>
            </div>{" "}
            <button className="h-[60px] bg-[#c2c2c0] text-3xl font-bold tracking-wider text-black hover:bg-gray-500 transition duration-300">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

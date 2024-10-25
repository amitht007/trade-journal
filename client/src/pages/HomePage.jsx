import React from "react";
import Navbar from "../components/Navbar";
import Records from "../components/Records";

const HomePage = () => {
  return (
    <div className="bg-black w-full h-full">
      <Navbar />
      <div className="bg-black w-full h-screen flex justify-center items-center">
        <Records />
      </div>
    </div>
  );
};

export default HomePage;

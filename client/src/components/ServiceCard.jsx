import React from "react";

const ServiceCard = ({ image, para_text }) => {
  return (
    <div className="w-[250px] h-fit rounded-md overflow-hidden hover:cursor-pointer">
      <div className="overflow-hidden bg-[#111111] rounded-xl transition-transform duration-300 hover:scale-105">
        <img
          src={image}
          alt="Service"
          className="w-full h-[50%] rounded-t-lg transition-transform duration-300 hover:scale-105"
        />
        <div className="p-4 text-center">
          <p className="text-white text-xl">{para_text}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

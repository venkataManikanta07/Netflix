import React from "react";
import { FaPlay } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video text-white bg-gradient-to-b from-black">
      <h1 className="mt-36 px-12 text-4xl font-bold pt-[5%]">{title}</h1>
      <p className="px-12 w-1/3 mt-4 text-lg">{overview}</p>
      <div className="px-12 py-4 flex">
        <button className="flex items-center bg-white text-black text-lg font-black px-4 py-2 mr-3 border rounded-sm hover:opacity-85">
          <span className="inline-block mr-2">
            <FaPlay />
          </span>
          Play
        </button>

        <button className="flex items-center bg-gray-50 text-white text-lg font-black px-4 py-2 mr-3 bg-opacity-30 border hover:opacity-80 border-black rounded-sm">
          More Info
          <span className="ml-1">
            <BsFillInfoCircleFill />
          </span>
        </button>
      </div>
    </div>
  );
};

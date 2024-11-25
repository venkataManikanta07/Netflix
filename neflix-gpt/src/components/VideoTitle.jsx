import React from "react";

export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video text-white bg-gradient-to-b from-black">
      <h1 className="mt-36 px-12 text-4xl font-bold pt-[8%]">{title}</h1>
      <p className="px-12 w-1/3 mt-4 text-lg">{overview}</p>
      <div className="px-12 py-4">
        <button className="bg-white text-black text-lg font-black px-4 py-2 mr-3  border rounded-sm hover:opacity-85">
          ▶ Play
        </button>
        <button className="bg-gray-200 text-black text-lg font-black px-4 py-2 mr-3 bg-opacity-80 border hover:opacity-80 border-black rounded-sm">
          More Info
        </button>
      </div>
    </div>
  );
};

import React from "react";
import { GptSearchBar } from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { NETFLIX_BACKGROUND } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="md:fixed md:-z-40 ">
        <img
          src={NETFLIX_BACKGROUND}
          className="h-screen object-cover md:h-auto"
          alt="Login-bg-img"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
};

export default GptSearch;

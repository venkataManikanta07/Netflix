import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-40 mr-1">
      <img src={IMAGE_CDN_URL + posterPath} alt="Movie Card" />
    </div>
  );
};

export default MovieCard;

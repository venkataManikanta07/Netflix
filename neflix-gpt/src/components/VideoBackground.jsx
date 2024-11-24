import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

export const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies?.trailerVideo);
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/912649/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log("All", json);
    const filteredTrailers = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredTrailers.length
      ? filteredTrailers[0]
      : json.results[0];

    dispatch(addTrailerVideo(trailer));
    console.log("trailer", trailer);
  };

  useEffect(() => {
    if (!movieId) return;
    getMovieVideos();
  }, []);
  return (
    <div>
      <iframe
        src={"https://www.youtube.com/embed/" + trailer.key}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

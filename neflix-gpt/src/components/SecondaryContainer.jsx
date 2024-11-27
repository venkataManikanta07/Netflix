import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  // console.log("---");

  // console.log(movies.nowPlayingMovies);
  // console.log(movies.topRatedMovies);
  // console.log("---");

  return (
    <div className="bg-black">
      <div className="-mt-96">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies.topRatedMovies} />
        <MovieList title="Upcoming" movies={movies.upComingMovies} />
        <MovieList title="New Arrival" movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);
  return (
    <div className="bg-black">
      <div className="-mt-96">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Trending" movies={movies.nowPlayingMovies} />
        <MovieList title="Upcoming" movies={movies.nowPlayingMovies} />
        <MovieList title="New Arrival" movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

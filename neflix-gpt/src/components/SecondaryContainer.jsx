import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="md:bg-black bg-black">
      <div className="md:-mt-80">
        <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies.topRatedMovies} />
        <MovieList title="Upcoming" movies={movies.upComingMovies} />
        <MovieList title="New Arrival" movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

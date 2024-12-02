import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return;
  console.log(movies)
  console.log("----------");
  
  return (
    <div className="bg-transparent relative z-30 p-4">
      <h1 className="text-white text-3xl font-bold mb-2">{title}</h1>

      <div className="flex  overflow-x-auto">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

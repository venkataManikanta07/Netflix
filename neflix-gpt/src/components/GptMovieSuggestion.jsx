import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieResults, movieNames } = gpt;
  if (!movieNames) return null;
  if (!movieResults) return null;
  console.log(movieResults);
  return (
    <div className="p-3 m-3 text-white bg-black opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          // <h3 className="text-white">{movieName}</h3>
           <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index].results}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestion;

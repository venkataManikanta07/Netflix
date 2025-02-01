import React, { useRef } from "react";
import language from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, OPEN_AI_KEY } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export const GptSearchBar = () => {
  const dispatch = useDispatch();
  const genAI = new GoogleGenerativeAI(OPEN_AI_KEY);

  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        encodeURIComponent(movie) +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const movieData = await data.json();
    if (movieData.results && movieData.results.length > 0) {
      return movieData; // Return the first result from TMDB
    } else {
      return null; // Return null if no results found
    }
  };
  const handleGptSearchClick = async () => {
    console.log("Inside Click");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt =
        "Act as a movie suggestion website and output the results of the top 5 movies and only give the movie names like this: Movie1, Movie2, Movie3, Movie4, Movie5." +
        searchText.current.value;

      const result = await model.generateContent([prompt]).catch((error) => {
        console.warn("API limit reached, using fallback data.");
        return {
          response: {
            text: () => "Inception, Avatar, Titanic, Interstellar, Gladiator",
          },
        };
      });

      const responseText = result.response.text();
      const moviesList = responseText.split(",").map((movie) => movie.trim());

      const moviesArray = moviesList.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(moviesArray);

      console.log(tmdbResults);
      dispatch(
        addGptMovieResult({ movieNames: moviesList, tmdbResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error occurred during GPT search:", error);
    }
  };

  return (
    <div className="md:pt-[10%] md:flex md:justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:bg-black md:p-6 border rounded-md border-black md:w-2/4 md:grid md:grid-cols-12 mt-[-739px] ml-[47px] md:ml-0 md:mt-0"
      >
        <input
          className="rounded-sm px-4 py-2 col-span-9 mr-4"
          type="text"
          ref={searchText}
          placeholder={language[langKey].gptSearchbarPlaceholder}
        />
        <button
          className="px-4 py-2 bg-red-800 text-white border rounded-r-sm border-red-600 col-span-3"
          onClick={handleGptSearchClick}
        >
          {language[langKey].search}
        </button>
      </form>
    </div>
  );
};

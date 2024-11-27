import React from "react";
import language from "../utils/languageConstants";
import { useSelector } from "react-redux";

export const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className=" pt-[10%] flex justify-center">
      <form className="bg-black p-6 border rounded-md border-black w-2/4 grid grid-cols-12">
        <input
          className="rounded-sm px-4 py-2 col-span-9 mr-4"
          type="text"
          placeholder={language[langKey].gptSearchbarPlaceholder}
        />
        <button className="px-4 py-2 bg-red-800 text-white border rounded-r-sm border-red-600 col-span-3">
          {language[langKey].search}
        </button>
      </form>
    </div>
  );
};

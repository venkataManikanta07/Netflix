import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  NETFLIX_LOGO,
  SUPPORTED_LANGUAGES,
  USER_LOGIN_LOGO,
} from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    //this will be unsubscribed when the component will unmount.
    return () => unsubscribe();
  }, []);
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="md:w-screen w-screen absolute bg-gradient-to-b from-black z-10 md:justify-between md:flex md:flex-row flex flex-col ml-0">
      <img
        className="w-24 m-3 md:ml-0 object-contain md:w-36"
        src={NETFLIX_LOGO}
        alt="Netflix Logo"
      />
      {user && (
        <div className="flex justify-end items-center p-4 -mt-16 ml-3 md:mt-0">
          {showGptSearch && (
            <select
              className={
                (showGptSearch ? "inline-block" : "invisible") +
                " md:mx-4 mx-2 md:my-2 my-1 md:p-2 text-xs md:text-base p-1 border rounded-lg bg-gray-800 border-gray-700 text-white"
              }
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option value={language.identifier}>{language.name}</option>
              ))}
            </select>
          )}
          <button
            className="bg-purple-800 text-white border rounded-sm border-purple-600 mx-3 md:mx-4 my-0 md:my-2  md:text-base text-sm w-20 md:w-28 h-9"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "Gpt-Search"}
          </button>
          <img
            className="md:w-10 md:h-10 md:border-transparent md:mr-0 hidden md:inline-block"
            src={user.photoURL ? user.photoURL : USER_LOGIN_LOGO}
            alt="profile image"
          />
          <button
            className="bg-red-800 font-semibold text-white border rounded-md border-transparent mx-3 md:mx-4 my-0 md:my-2  md:text-base md:p-0 text-sm w-20 md:w-28 h-9"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

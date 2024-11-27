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
    <div className="w-screen absolute bg-gradient-to-b from-black px-8 py-4 z-10 flex justify-between ">
      <img className="w-36" src={NETFLIX_LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex items-center p-4">
          {showGptSearch && (
            <select
              className="mx-4 my-2 p-2 border rounded-lg bg-gray-800 border-gray-700 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option value={language.identifier}>{language.name}</option>
              ))}
            </select>
          )}
          <button
            className="bg-purple-800 text-white border rounded-sm border-purple-600 mx-4 my-2 p-2"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "Gpt-Search"}
          </button>
          <img
            className="w-10 h-10 border-transparent mr-4"
            src={user.photoURL ? user.photoURL : USER_LOGIN_LOGO}
            alt="profile image"
          />
          <button
            className="bg-red-800 font-semibold my-2 p-2 text-white border rounded-md border-transparent"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

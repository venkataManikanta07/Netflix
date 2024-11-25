import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { NETFLIX_LOGO, USER_LOGIN_LOGO } from "../utils/constants";



export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
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
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    //this will be unsubscribed when the component will unmount. 
    return () => unsubscribe(); 
  }, []);
  
  return (
    <div className="w-screen absolute bg-gradient-to-r from-black px-8 py-4 z-10 flex justify-between ">
      <img
        className="w-36"
        src= {NETFLIX_LOGO}
        alt="Netfli Logo"
      />
      {user && (
        <div className="flex items-center p-4">
          <img
            className="w-8 h-8 border-transparent mr-4"
            src={
              user.photoURL
                ? user.photoURL
                : USER_LOGIN_LOGO
            }
            alt="profile image"
          />
          <button
            className="bg-red-800 font-semibold h-[36px] w-[84px] text-white border rounded-md border-transparent"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

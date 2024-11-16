import React, { useRef, useState } from "react";
import { Header } from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message !== null) return;
    console.log("After Message");
    if (!isSignInForm) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-4209-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABelYeQhdDSleXnwq1Y7EyxtTDiSw3ZgK2EnBQR5Y-Yav3LC10tCzbIcvsA34KEM-SgBfopzYVOVyKm80bahrQiAqpBqGf2w.png?r=15e",
          })
            .then(() => {
              // Profile updated!
              navigate("/browse")
              // ...
            })
            .catch((error) => {
              // An error occurred
              navigate("/error")
              // ...
            });

          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg"
          alt="Login-bg-img"
        />
      </div>
      <form
        className="flex flex-col m-auto right-0 left-0 absolute mt-32 bg-black opacity-95  w-3/12 h-auto text-white p-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="my-5 h-11 bg-gray-900 px-2"
            type="text"
            ref={name}
            placeholder="Full Name"
          />
        )}
        <input
          className="my-5 h-11 bg-gray-900 px-2"
          ref={email}
          type="text"
          placeholder="Email Address"
        />
        <input
          className="my-5 h-11 bg-gray-900 px-2"
          ref={password}
          type="password"
          placeholder="Password"
        />
        <p className="text-red-800 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="my-5 h-11 bg-red-800 px-2 rounded-lg"
          onClick={() => handleButtonClick()}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="cursor-pointer hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already a member Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

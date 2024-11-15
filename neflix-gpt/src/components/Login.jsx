import React, { useState } from "react";
import { Header } from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
      <form className="flex flex-col m-auto right-0 left-0 absolute mt-32 bg-black opacity-95  w-3/12 h-auto text-white p-12">
        <h1 className="font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="my-5 h-11 bg-gray-900 px-2"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          className="my-5 h-11 bg-gray-900 px-2"
          type="text"
          placeholder="Email Address"
        />
        <input
          className="my-5 h-11 bg-gray-900 px-2"
          type="password"
          placeholder="Password"
        />
        <button className="my-5 h-11 bg-red-800 px-2 rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="cursor-pointer hover:underline"
          onClick={toggleSignInForm}
        >
          {isSignInForm ? "New to Netflix? Sign Up Now" : "Already a member Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

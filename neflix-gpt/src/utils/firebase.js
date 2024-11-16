// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1M2T7zUIuUqVMWSwvCeJ1qIZyb1uWhm0",
  authDomain: "netflix-gpt-2be4f.firebaseapp.com",
  projectId: "netflix-gpt-2be4f",
  storageBucket: "netflix-gpt-2be4f.firebasestorage.app",
  messagingSenderId: "956898891612",
  appId: "1:956898891612:web:ab49979d6e23ed24e39399",
  measurementId: "G-3FL3TT71SG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

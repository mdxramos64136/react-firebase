// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6kHbHcPlNbfY-PDQGFdyknqoXoVOtWQ8",
  authDomain: "react-firebase-ed33e.firebaseapp.com",
  projectId: "react-firebase-ed33e",
  storageBucket: "react-firebase-ed33e.firebasestorage.app",
  messagingSenderId: "617918676352",
  appId: "1:617918676352:web:f494cc54c166f794fbd565",
  measurementId: "G-0M2CJ87PPG",
};

// Initialize Firebase
// app var will conect the project with the Firebase Services
const app = initializeApp(firebaseConfig);

//For each service that you use, criate a var and assign the
//service to it (do forget to import it)
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

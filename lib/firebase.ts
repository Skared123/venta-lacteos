// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy1Sln7wkqkSFcEBVWdFRIOlxpkv57mP8",
  authDomain: "venta-de-lacteos.firebaseapp.com",
  projectId: "venta-de-lacteos",
  storageBucket: "venta-de-lacteos.appspot.com",
  messagingSenderId: "247228247620",
  appId: "1:247228247620:web:9e9f2853e3d6dd95f51611"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;

/* ==== Auth functions  ==== */

/* Sign in with email and password */
export const signIn = async (user: {email: string, password: string}) => {
     return await signInWithEmailAndPassword(auth, user.email, user.password)
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy1Sln7wkqkSFcEBVWdFRIOlxpkv57mP8",
  authDomain: "venta-de-lacteos.firebaseapp.com",
  projectId: "venta-de-lacteos",
  storageBucket: "venta-de-lacteos.appspot.com",
  messagingSenderId: "247228247620",
  appId: "1:247228247620:web:9e9f2853e3d6dd95f51611",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

/* ============ Auth functions  ============ */

/* Sign in with email and password */
export const signIn = async (user: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, user.email, user.password);
};

/* Sign up with email and password */
export const createUser = async (user: { email: string; password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password);
};

/* Updates user's displayName and photoUrl */
export const updateUser = (user: {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}) => {
  if (auth.currentUser) return updateProfile(auth.currentUser, user);
};

/* Send email to reset user's password */
export const sendResetEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

/* Sign out  */
export const signOutUser = () => {
  localStorage.removeItem("user");
  return auth.signOut();
};

/* ============ Database Functions =============== */

/* Set a document in a collection */
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path), data);
};

/* Get a document in a collection */
export const getDocument = async (path: string) => {
  return (await getDoc(doc(db, path))).data();
};

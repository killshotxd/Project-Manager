import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7h4pfdXHISDHN4X2IOPA7QGmcLZrl6ok",
  authDomain: "projectfairauth.firebaseapp.com",
  projectId: "projectfairauth",
  storageBucket: "projectfairauth.appspot.com",
  messagingSenderId: "899677429849",
  appId: "1:899677429849:web:b54c0b06a9a24cfaf8d148",
  measurementId: "G-8N6SVTP3QR",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(firebaseApp);
const db = getFirestore(firebaseApp);

// -------------Updating user to db-------------
const updateUserDb = async (user, uid) => {
  if (typeof user !== "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user });
};

// -------------Getting user from db-------------

const getUserFromDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const result = await getDoc(docRef);

  if (!result.exists()) return null;
  return result.data();
};

export { firebaseApp, auth, db, updateUserDb, getUserFromDb };

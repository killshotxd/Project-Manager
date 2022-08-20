import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export default { app, getAuth };

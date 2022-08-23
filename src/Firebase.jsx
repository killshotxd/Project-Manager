import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getFirestore, setDoc, getDoc, addDoc } from "firebase/firestore";

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
const storage = getStorage(firebaseApp);

// -------------Updating user to db-------------
const updateUserDb = async (user, uid) => {
  if (typeof user !== "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user, uid });
};

// -------------Getting user from db-------------

const getUserFromDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const result = await getDoc(docRef);

  if (!result.exists()) return null;
  return result.data();
};

// ------------Upload Image to FB---------------

const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
  if (!file) {
    errorCallback("File not found");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if (!fileType.includes("image")) {
    errorCallback("File must an image");
    return;
  }
  if (fileSize > 2) {
    errorCallback("File must smaller than 2MB");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);

  const task = uploadBytesResumable(storageRef, file);

  task.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressCallback(progress);
    },
    (error) => {
      errorCallback(error.message);
    },
    () => {
      getDownloadURL(storageRef).then((url) => {
        urlCallback(url);
      });
    }
  );
};

// --------------------Update Projects----------------

const addProjectsInDb = async (project) => {
  if (typeof user !== "object") return;
  const collectionRef = doc(db, "projects");
  await addDoc(collectionRef, { ...project });
};

// --------------------------------------------------------------
// --------------Export Handler--------------

export {
  firebaseApp,
  auth,
  db,
  updateUserDb,
  getUserFromDb,
  uploadImage,
  addProjectsInDb,
};

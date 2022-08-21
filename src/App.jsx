import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import { auth, getUserFromDb } from "./Firebase";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDb(uid);
    setUserDetails(userDetails);
  };

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) return;

      setIsAuth(true);
      fetchUserDetails(user.uid);
    });
    return () => listener();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/signUp" element={<Auth signUp />} />
          <Route path="/account" element={<h1>Account</h1>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

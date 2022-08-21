import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import { auth, getUserFromDb } from "./Firebase";

const App = () => {
  // ------States-------------
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState([]);

  // ---------Function for userDetail fetch--------
  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDb(uid);
    setUserDetails(userDetails);
  };

  // --------UseEffect for detecting state change---
  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) return;
      setIsAuth(true);
      fetchUserDetails(user.uid);
    });
    return () => listener();
  }, []);

  // -------------Main App Return-------------------

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!isAuth && (
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/signUp" element={<Auth signUp />} />
            </>
          )}
          <Route path="/account" element={<h1>Account</h1>} />
          <Route path="/" element={<Home auth={isAuth} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

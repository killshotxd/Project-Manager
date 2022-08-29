import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import { auth, getUserFromDb } from "./Firebase";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  // ------States-------------
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // ---------Function for userDetail fetch--------
  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDb(uid);
    setUserDetails(userDetails);
    setIsDataLoaded(true);
  };

  // --------UseEffect for detecting state change---
  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsDataLoaded(true);
        setIsAuth(false);
        return;
      }

      setIsAuth(true);
      fetchUserDetails(user.uid);
    });

    return () => listener();
  }, []);

  // -------------Main App Return-------------------

  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          {isDataLoaded ? (
            <Routes>
              {!isAuth && (
                <>
                  <Route path="/login" element={<Auth />} />
                  <Route path="/signUp" element={<Auth signUp />} />
                </>
              )}
              <Route
                path="/account"
                element={<Account userDetails={userDetails} auth={isAuth} />}
              />
              <Route path="/" element={<Home auth={isAuth} />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <Loader />
          )}
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, updateUserDb } from "../../Firebase";
import styles from "./Auth.module.css";
import { useToast } from "@chakra-ui/react";
import google from "../../assets/google.svg";
const Auth = (props) => {
  const isSignUp = props.signUp ? true : false;
  const toast = useToast();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const navigate = useNavigate();

  // -----------------Login Part ---------------

  const handleLogin = () => {
    const googleProvide = new GoogleAuthProvider();
    setSubmitButtonDisabled(true);
    signInWithPopup(auth, googleProvide)
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/");
        toast({
          title: "Logged in Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrMsg(err.message);
      });
  };

  // ----------------Login Part End ---------------

  // -----------------SignUp Part ---------------

  const handleSignUp = () => {
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth)
      .then(async (response) => {
        const userId = response.user.uid;
        await updateUserDb({ name: values.name, email: values.email }, userId);
        setSubmitButtonDisabled(false);
        navigate("/");
        toast({
          title: "Signed up Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrMsg(err.message);
      });
  };

  // -----------------SignUp Part End ---------------

  // ------------------Pass reset------------------

  const handlePassReset = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        toast({
          title: "Reset Link to email sent Successfully",
          status: "success",
          duration: 80000,
          isClosable: true,
        });
        setErrMsg("");
      })
      .catch((error) => {
        setErrMsg(error.message);
        // ..
      });
  };

  const handleSubmission = (event) => {
    event.preventDefault();

    if (isSignUp) handleSignUp();
    else handleLogin();
  };

  return (
    <div className={styles.container}>
      <p className={styles.smallLink}>
        <Link to="/">{"< Back to Home"}</Link>
      </p>
      <form className={styles.form} onSubmit={handleSubmission}>
        <p className={styles.heading}>SignUp or Login</p>

        <button
          style={{
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <img width={40} src={google} alt="google" />
        </button>

        <p className={styles.error}> {errMsg} </p>

        <div className={styles.bottom}></div>
      </form>
    </div>
  );
};

export default Auth;

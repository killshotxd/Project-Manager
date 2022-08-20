import React from "react";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
const Auth = (props) => {
  const isSignUp = props.signUp ? true : false;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.smallLink}>
        <Link to="/">{"< Back to Home"}</Link>
      </p>
      <form className={styles.form}>
        <p className={styles.heading}>{isSignUp ? "SignUp" : "Login"}</p>

        <InputControl label="Name" placeholder="Enter your name" />
        <InputControl label="Email" placeholder="Enter your email" />
        <InputControl label="Password" placeholder="Enter your password" />

        <button>{isSignUp ? "SignUp" : "Login"}</button>
      </form>
    </div>
  );
};

export default Auth;

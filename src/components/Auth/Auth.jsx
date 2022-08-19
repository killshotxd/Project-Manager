import React from "react";
import InputControl from "../InputControl/InputControl";
import styles from "./Auth.module.css";
const Auth = (props) => {
  const isSignUp = props.signUp ? true : false;

  return (
    <div className={styles.container}>
      <p className={styles.smallLink}>{"< Back to Home"}</p>
      <form className={styles.form}>
        <p className={styles.heading}>{isSignUp ? "SignUp" : "Login"}</p>

        <InputControl />
      </form>
    </div>
  );
};

export default Auth;

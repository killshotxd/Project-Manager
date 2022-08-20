import React, { useState } from "react";
import InputControl from "../InputControl/InputControl";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
const Auth = (props) => {
  const isSignUp = props.signUp ? true : false;

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {};

  const handleSignUp = () => {
    if (!values.name || !values.email || !values.password) {
      setErrMsg("All fields are required");
    }
    return;
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
        <p className={styles.heading}>{isSignUp ? "SignUp" : "Login"}</p>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />

        <InputControl
          label="Email"
          placeholder="Enter your email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <InputControl
          label="Password"
          placeholder="Enter your password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          isPassword
        />

        <p className={styles.error}> {errMsg} </p>

        <button type="submit">{isSignUp ? "SignUp" : "Login"}</button>

        <div className={styles.bottom}>
          {isSignUp ? (
            <p>
              Already have an account ? <Link to="/login">Login here</Link>
            </p>
          ) : (
            <p>
              New here ? <Link to="/signUp">Create an account</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;

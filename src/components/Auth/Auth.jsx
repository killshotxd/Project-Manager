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
import { FcGoogle } from "react-icons/fc";
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
    if (!values.email || !values.password) {
      setErrMsg("All fields are required");
      return;
    }

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
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

  const handlePopupLogin = async () => {
    const gp = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, gp);
    const userId = result.user.uid;
    await updateUserDb(
      { name: result.user.displayName, email: result.user.email },
      userId
    );
    console.log(result);
  };

  // ----------------Login Part End ---------------

  // -----------------SignUp Part ---------------

  const handleSignUp = () => {
    if (!values.name || !values.email || !values.password) {
      setErrMsg("All fields are required");
      return;
    }

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
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
        <p className={styles.heading}>{isSignUp ? "SignUp" : "Login"}</p>

        {isSignUp && (
          <InputControl
            label="Name"
            placeholder="Enter your name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, name: event.target.value }))
            }
          />
        )}

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

        <button type="submit" disabled={submitButtonDisabled}>
          {isSignUp ? "SignUp" : "Login"}
        </button>

        <div style={{ marginBottom: "1rem" }} className={styles.bottom}>
          {isSignUp ? (
            <p>
              Already have an account ? <Link to="/login">Login here</Link>
            </p>
          ) : (
            <p>
              New here ? <Link to="/signUp">Create an account</Link>
            </p>
          )}
          <p
            onClick={handlePassReset}
            style={{
              cursor: "pointer",
              marginTop: "0.5rem",
              color: "#10293e",
              textDecoration: "underline",
              marginBottom: "1rem",
            }}
          >
            Forgot password ?
          </p>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              fontWeight: "bold",
            }}
          >
            Or SignUp/Login Using :
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            <FcGoogle onClick={handlePopupLogin} size={30} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;

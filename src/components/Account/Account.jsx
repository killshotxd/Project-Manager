import React, { useRef } from "react";
import styles from "./Account.module.css";
import { Camera, LogOut } from "react-feather";
import InputControl from "../InputControl/InputControl";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, uploadImage } from "../../Firebase";

const Account = (props) => {
  const userDetails = props.userDetails;
  const isAuth = props.auth;

  const imagePicker = useRef();

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCameraClick = () => {
    imagePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // uploadImage(
    //   file,
    //   (progress) => {},
    //   (url) => console.log("Uploaded->", url),
    //   (err) => console.log("Error->", err)
    // );
  };

  return isAuth ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span>{userDetails.name}</span>
        </p>

        <div className={styles.logout} onClick={handleLogout}>
          <LogOut /> Logout
        </div>
      </div>

      <input
        ref={imagePicker}
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className={styles.section}>
        <div className={styles.title}>Your Profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src="https://avatars.githubusercontent.com/u/89957432?v=4"
                alt="profile"
              />
              <div className={styles.camera} onClick={handleCameraClick}>
                <Camera />
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.row}>
              <InputControl label="Name" />
              <InputControl
                label="Title"
                placeholder="e.g Front-End Developer"
              />
              <InputControl label="Github" placeholder="Github Link" />
              <InputControl label="LinkedIn" placeholder="LinkedIn Link" />
            </div>
            <button className={styles.saveButton}>Save Details</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Account;

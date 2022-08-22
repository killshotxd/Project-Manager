import React from "react";
import styles from "./Account.module.css";
import { Camera, LogOut } from "react-feather";
import InputControl from "../InputControl/InputControl";

const Account = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span>User</span>
        </p>

        <div className={styles.logout}>
          <LogOut /> Logout
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Your Profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src="https://avatars.githubusercontent.com/u/89957432?v=4"
                alt="profile"
              />
              <div className={styles.camera}>
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
  );
};

export default Account;

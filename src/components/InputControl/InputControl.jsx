import React, { useState } from "react";
import { EyeOff, Eye } from "react-feather";
import styles from "./InputControl.module.css";
const InputControl = ({ label, isPassword, ...props }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          type={isPassword ? (isVisible ? "text" : "password") : "text"}
          {...props}
        />
        {isPassword && (
          <div className={styles.icon}>
            {isVisible ? (
              <EyeOff onClick={() => setIsVisible((prev) => !prev)} />
            ) : (
              <Eye onClick={() => setIsVisible((prev) => !prev)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputControl;

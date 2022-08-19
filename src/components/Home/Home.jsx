import React from "react";
import styles from "./Home.module.css";
import designIcon from "../../assets/designer.svg";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNextBtnClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p className={styles.heading}>Project Fair</p>
          <p className={styles.subHeading}>
            One stop destination for all software development projects.
          </p>
          <button onClick={handleNextBtnClick}>
            Get Started <ArrowRight />
          </button>
        </div>

        <div className={styles.right}>
          <img src={designIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;

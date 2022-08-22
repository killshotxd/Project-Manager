import React from "react";
import InputControl from "../../InputControl/InputControl";
import Modal from "../../Modal/Modal";
import styles from "./ProjectForm.module.css";
const ProjectForm = (props) => {
  // --------States----------------

  const [values, setValues] = useState({
    thumbnail: defaults?.thumbnail || "",
    title: defaults?.title || "",
    overview: defaults?.overview || "",
    github: defaults?.github || "",
    link: defaults?.link || "",
    points: defaults?.points || ["", ""],
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [imageUploadStarted, setImageUploadStarted] = useState(false);

  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const [submitButtonDisabled, setSetSubmitButtonDisabled] = useState(false);

  //   ---------------------------------------------
  return (
    <Modal onClose={() => (props.onClose ? props.onClose() : "")}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/developer-5-338076.png"
                alt="Thumbnail"
              />
              <p>
                <span>40%</span> Uploaded...
              </p>
            </div>

            <InputControl label="Github" />
            <InputControl label="Deployed/Live Link" />
          </div>
          <div className={styles.right}>
            <InputControl label="Project Name" />
            <InputControl label="Project Overview" />

            <div className={styles.description}>
              <div className={styles.top}>
                <p className={styles.title}>Project Description</p>
                <p className={styles.link}>+ Add point</p>
              </div>

              <InputControl />
              <InputControl />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.footer}>Cancel</p>
          <button className="button">Submit</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectForm;

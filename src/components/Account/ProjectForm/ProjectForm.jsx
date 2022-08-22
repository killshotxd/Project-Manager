import React, { useState } from "react";
import InputControl from "../../InputControl/InputControl";
import { X } from "react-feather";
import Modal from "../../Modal/Modal";
import styles from "./ProjectForm.module.css";
const ProjectForm = (props) => {
  const defaults = props.default;

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

  //   -----------Functions-------------------------

  const handlePointUpdate = (value, index) => {
    const tempPoints = [...values.points];
    tempPoints[index] = value;
    setValues((prev) => ({ ...prev, points: tempPoints }));
  };

  const handleAddPoint = () => {
    if (values.points.length > 4) return;
    setValues((prev) => ({ ...prev, points: [...values.points, ""] }));
  };

  const handlePointDelete = (index) => {
    const tempPoints = [...values.points];
    tempPoints.splice(index, 1);
    setValues((prev) => ({ ...prev, points: tempPoints }));
  };

  //   -----------------------------------------------
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

            <InputControl
              label="Github"
              value={values.github}
              placeholder="Project repository link"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  github: event.target.value,
                }))
              }
            />
            <InputControl
              label="Deployed/Live Link"
              placeholder="Project Deployed link"
              value={values.link}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  link: event.target.value,
                }))
              }
            />
          </div>
          <div className={styles.right}>
            <InputControl
              label="Project Name"
              placeholder="Enter project title"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
            <InputControl
              label="Project Overview"
              placeholder="Project's brief overview"
              value={values.overview}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  overview: event.target.value,
                }))
              }
            />

            <div className={styles.description}>
              <div className={styles.top}>
                <p className={styles.title}>Project Description</p>
                <p className={styles.link} onClick={handleAddPoint}>
                  + Add point
                </p>
              </div>
              <div className={styles.inputs}>
                {values.points.map((item, index) => (
                  <div className={styles.input} key={index}>
                    <InputControl
                      key={index}
                      placeholder="Type something..."
                      value={item}
                      onChange={(event) =>
                        handlePointUpdate(event.target.value, index)
                      }
                    />
                    {index > 1 && (
                      <X onClick={() => handlePointDelete(index)} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p
            className={styles.cancel}
            onClick={() => (props.onClose ? props.onClose() : "")}
          >
            Cancel
          </p>
          <button className="button">Submit</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectForm;

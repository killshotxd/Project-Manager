import React from "react";
import Modal from "../../Modal/Modal";
import styles from "./ProjectForm.module.css";
const ProjectForm = (props) => {
  return (
    <div>
      <Modal onClose={() => (props.onClose ? props.onClose() : "")}>
        <h1>Hello</h1>
      </Modal>
    </div>
  );
};

export default ProjectForm;

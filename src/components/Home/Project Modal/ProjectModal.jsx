import React from "react";
import Modal from "../../Modal/Modal";
import styles from "./ProjectModal.module.css";
const ProjectModal = (props) => {
  return (
    <Modal onClose={() => (props.onClose ? props.onClose() : "")}>
      <div className={styles.container}>Kuch bhi</div>
    </Modal>
  );
};

export default ProjectModal;

import React, { useEffect, useRef, useState } from "react";
import styles from "./Account.module.css";
import { Camera, LogOut, Edit2, Trash, GitHub, Paperclip } from "react-feather";
import InputControl from "../InputControl/InputControl";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, uploadImage, updateUserDb } from "../../Firebase";
import Loader from "../Loader/Loader";
import ProjectForm from "./ProjectForm/ProjectForm";

const Account = (props) => {
  // --------------States----------------------

  const userDetails = props.userDetails;
  const isAuth = props.auth;
  const [progress, setProgress] = useState(0);
  const [profileImageUploadStarted, setProfileImageUploadStarted] =
    useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(
    userDetails.profileImage ||
      "https://cdn.iconscout.com/icon/premium/png-256-thumb/developer-5-338076.png"
  );
  const imagePicker = useRef();

  const [userProfileValues, setUserProfileValues] = useState({
    name: userDetails.name || "",
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
  });

  const [showSaveDetailsButton, setShowSaveDetailsButton] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isEditProjectModal, setIsEditProjectModal] = useState(false);
  const [editProject, setEditProject] = useState({});

  // ------------------States End-------------------

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleCameraClick = () => {
    imagePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setProfileImageUploadStarted(true);
    uploadImage(
      file,
      (progress) => {
        setProgress(progress);
      },
      (url) => {
        setProfileImageUrl(url);
        updateProfileImageToDatabase(url);
        console.log("After", url);
        setProfileImageUploadStarted(false);
        setProgress(0);
      },
      (err) => {
        console.log("Error->", err);
        setProfileImageUploadStarted(false);
      }
    );
  };

  const updateProfileImageToDatabase = (url) => {
    updateUserDb({ ...userProfileValues, profileImage: url }, userDetails.uid);
  };

  const handleInputChange = (event, property) => {
    setShowSaveDetailsButton(true);

    setUserProfileValues((prev) => ({
      ...prev,
      [property]: event.target.value,
    }));
  };

  const saveDetailsToDatabase = async () => {
    if (!userProfileValues.name) {
      setErrorMessage("Name required");
      return;
    }

    setSaveButtonDisabled(true);
    await updateUserDb({ ...userProfileValues }, userDetails.uid);
    setSaveButtonDisabled(false);
    setShowSaveDetailsButton(false);
  };

  return isAuth ? (
    <div className={styles.container}>
      {showProjectForm && (
        <ProjectForm onClose={() => setShowProjectForm(false)} />
      )}

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
              <img src={profileImageUrl} alt="profile" />
              <div className={styles.camera} onClick={handleCameraClick}>
                <Camera />
              </div>
            </div>

            {profileImageUploadStarted ? (
              <p className={styles.progress}>
                {progress === 100
                  ? "Getting image url..."
                  : `${progress.toFixed(2)} % Uploading..`}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.row}>
              <InputControl
                label="Name"
                placeholder="Enter your name"
                value={userProfileValues.name}
                readOnly
                // onChange={(event) => handleInputChange(event, "name")}
              />
              <InputControl
                label="Title"
                placeholder="e.g Front-End Developer"
                value={userProfileValues.designation}
                onChange={(event) => handleInputChange(event, "designation")}
              />
              <InputControl
                label="Github"
                placeholder="Github Link"
                value={userProfileValues.github}
                onChange={(event) => handleInputChange(event, "github")}
              />
              <InputControl
                label="LinkedIn"
                placeholder="LinkedIn Link"
                value={userProfileValues.linkedin}
                onChange={(event) => handleInputChange(event, "linkedin")}
              />
            </div>
            <div className={styles.footer}>
              <p className={styles.error}>{errorMessage}</p>
              {showSaveDetailsButton && (
                <button
                  disabled={saveButtonDisabled}
                  className={"button"}
                  onClick={saveDetailsToDatabase}
                >
                  Save Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className={styles.section}>
        <div className={styles.projectsHeader}>
          <div className={styles.title}>Your Projects</div>
          <button className="button" onClick={() => setShowProjectForm(true)}>
            Add Project
          </button>
        </div>

        <div className={styles.projects}>
          {projectsLoaded ? (
            projects.length > 0 ? (
              projects.map((item, index) => (
                <div className={styles.project} key={item.title + index}>
                  <p className={styles.title}>{item.title}</p>

                  <div className={styles.links}>
                    <Edit2 onClick={() => handleEditClick(item)} />
                    <Trash onClick={() => handleDeletion(item.pid)} />
                    <Link target="_blank" to={`//${item.github}`}>
                      <GitHub />
                    </Link>
                    {item.link ? (
                      <Link target="_blank" to={`//${item.link}`}>
                        <Paperclip />
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No projects found</p>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Account;

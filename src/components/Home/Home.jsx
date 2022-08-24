import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import designIcon from "../../assets/designer.svg";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../Firebase";
import { doc } from "firebase/firestore";
import Loader from "../Loader/Loader";
import ProjectModal from "./Project Modal/ProjectModal";

const Home = (props) => {
  const navigate = useNavigate();

  const isAuth = props.auth ? true : false;

  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState({});

  const handleNextBtnClick = () => {
    if (isAuth) navigate("/account");
    else navigate("/login");
  };

  const fetchAllProjects = async () => {
    const result = await getAllProjects();
    setProjectsLoaded(true);
    if (!result) {
      return;
    }
    const tempProjects = [];

    result.forEach((doc) => tempProjects.push({ ...doc.data(), pid: doc.id }));

    setProjects(tempProjects);
  };

  const handleProjectCardClick = (project) => {
    setShowProjectModal(true);
    setProjectDetails(project);
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <div className={styles.container}>
      {showProjectModal && (
        <ProjectModal
          onClose={() => setShowProjectModal(false)}
          details={projectDetails}
        />
      )}

      <div className={styles.header}>
        <div className={styles.left}>
          <p className={styles.heading}>Project Fair</p>
          <p className={styles.subHeading}>
            One stop destination for all software development projects.
          </p>
          <button onClick={handleNextBtnClick}>
            {isAuth ? "Manage your Projects" : "Get Started"}
            <ArrowRight />
          </button>
        </div>

        <div className={styles.right}>
          <img src={designIcon} alt="" />
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.title}>All projects</p>
        <div className={styles.projects}>
          {projectsLoaded ? (
            projects.length > 0 ? (
              projects.map((item) => (
                <div
                  className={styles.project}
                  key={item.pid}
                  onClick={() => handleProjectCardClick(item)}
                >
                  <div className={styles.image}>
                    <img
                      src={
                        item.thumbnail ||
                        "https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png"
                      }
                      alt="Project thumbnail"
                    />
                  </div>
                  <p className={styles.title}>{item.title}</p>
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
  );
};

export default Home;

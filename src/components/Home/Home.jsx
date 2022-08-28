import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import designIcon from "../../assets/designer.svg";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../Firebase";
import { doc } from "firebase/firestore";
import Loader from "../Loader/Loader";
import AOS from "aos";
import "aos/dist/aos.css";
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

  const [name, setName] = useState("");

  // the search result

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      console.log(keyword);
      const results = projects.filter((item) => {
        return item.title.toLowerCase().startsWith(keyword.toLowerCase());

        // Use the toLowerCase() method to make it case-insensitive
      });
      setProjects(results);
    } else {
      fetchAllProjects();
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
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
        <div data-aos="fade-right" className={styles.left}>
          <p className={styles.heading}>Project Manager</p>
          <p className={styles.subHeading}>
            One stop destination for all your WebApps/WebSites 🚀
          </p>
          <button onClick={handleNextBtnClick}>
            {isAuth ? "Manage your Projects" : "Get Started"}
            <ArrowRight />
          </button>
        </div>

        <div data-aos="fade-left" className={styles.right}>
          <img src={designIcon} alt="" />
        </div>
      </div>

      <div data-aos="fade-up" className={styles.body}>
        <div className={styles.leftTitle}>
          <p data-aos="fade-up" className={styles.title}>
            All projects
          </p>
        </div>

        <input
          type="search"
          value={name}
          className={styles.inputContainer}
          onChange={filter}
          placeholder="Search Projects...."
        />

        <div data-aos="fade-up" className={styles.projects}>
          {projects || projectsLoaded ? (
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

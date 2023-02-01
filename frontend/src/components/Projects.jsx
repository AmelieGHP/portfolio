import React, { useState, useEffect } from "react";
import axios from "axios";
import Project from "./Project";

function Projects() {
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/project`)
      .then((result) => {
        const tempArray = [];
        if (result.data.length > 0) {
          for (let i = 0; i < result.data.length; i++) {
            tempArray.push(result.data[i]);
          }
        }
        setProjects(tempArray);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div id="projects" className="section projects">
      <h2>Projects</h2>
      <div className="projectsContainer">
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <Project
                name={project.projectName}
                description={project.projectDescription}
                link={project.websiteLink}
                repo={project.projectGithub}
                id={project.idproject}
                image1={project.image1}
                image2={project.image2}
                image3={project.image3}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Projects;

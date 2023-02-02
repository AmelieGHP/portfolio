import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";

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
    <div className="section projects">
      <h2>Projects</h2>
      <div className="projectsContainer">
        {projects.length > 0 &&
          projects.map((project) => {
            return (
              <ProjectCard
                name={project.projectName}
                image1={project.image1}
                id={project.idproject}
                key={project.idproject}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Projects;

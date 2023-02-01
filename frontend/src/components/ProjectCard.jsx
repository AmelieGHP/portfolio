import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ name, image1, id }) {
  return (
    <Link to={`/project/${id}`} className="projectCard">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${image1}`}
        alt="screen"
      />
      <h4>{name}</h4>
    </Link>
  );
}

export default ProjectCard;

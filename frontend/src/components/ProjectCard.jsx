import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

function ProjectCard({ name, image1, id }) {
  return (
    <Link to={`/project/${id}`} className="projectCard">
      <div className="imgContainer">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${image1}`}
          alt="screen"
        />
      </div>
      <h4>{name}</h4>
    </Link>
  );
}
ProjectCard.propTypes = {
  name: Proptypes.string,
  id: Proptypes.number,
  image1: Proptypes.string,
};
export default ProjectCard;

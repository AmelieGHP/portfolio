import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Proptypes from "prop-types";

function ProjectCardAdmin({ name, image1, id, getProjects }) {
  const deleteProject = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/project/${id}`)
      .then((result) => {
        if (result.status === 204) {
          getProjects;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="projectCard">
      <div className="imgContainer">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${image1}`}
          alt="screen"
        />
      </div>
      <h4>{name}</h4>
      <div className="buttonContainer">
        <Link to={`/admin/project/${id}`}>
          <button type="button">Update</button>
        </Link>
        <button
          className="delete"
          type="button"
          onClick={() => deleteProject()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
ProjectCardAdmin.propTypes = {
  name: Proptypes.string.isRequired,
  id: Proptypes.number.isRequired,
  image1: Proptypes.string.isRequired,
  getProjects: Proptypes.func.isRequired,
};
export default ProjectCardAdmin;

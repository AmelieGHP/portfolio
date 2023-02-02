import React from "react";
import { Link } from "react-router-dom";

function ProjectCardAdmin({ name, image1, id }) {
  const deleteProject = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/project/${id}`)
      .then((result) => {
        console.log(result);
        if (result.status === 204) {
          alert("Done!");
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

export default ProjectCardAdmin;

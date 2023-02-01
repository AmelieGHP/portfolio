import React from "react";

function Project({
  name,
  description,
  link,
  repo,
  id,
  image1,
  image2,
  image3,
}) {
  return (
    <div className="project">
      <p>{name}</p>
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${image1}`}
        alt="screen"
      />
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${image2}`}
        alt="screen"
      />
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${image3}`}
        alt="screen"
      />
      <p>{description}</p>
      <a href={link} target="_blank" rel="noreferrer">
        View website
      </a>
      <a href={repo} target="_blank" rel="noreferrer">
        View repo Github
      </a>
    </div>
  );
}

export default Project;

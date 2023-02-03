import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Nav from "@components/Nav";

function Project() {
  const params = useParams();
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [bigImage1, setBigImage1] = useState(false);
  const [bigImage2, setBigImage2] = useState(false);
  const [bigImage3, setBigImage3] = useState(false);

  const getProject = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/project/${id}`, [id])
      .then((result) => {
        setName(result.data[0].projectName);
        setDescription(result.data[0].projectDescription);
        setLink(result.data[0].websiteLink);
        setRepo(result.data[0].projectGithub);
        setImage1(result.data[0].image1);
        setImage2(result.data[0].image2);
        setImage3(result.data[0].image3);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <Nav />
      <div className="project">
        <h2>{name}</h2>
        <div className="imgsContainer">
          <div className="imgContainer">
            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/images/${image1}`}
              alt="screen"
              className={bigImage1 ? "bigImage" : ""}
              onClick={() => {
                window.innerWidth > 950 &&
                  !bigImage3 &&
                  !bigImage2 &&
                  setBigImage1(!bigImage1);
              }}
            />
          </div>
          <div className="imgContainer">
            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/images/${image2}`}
              alt="screen"
              className={bigImage2 ? "bigImage" : ""}
              onClick={() => {
                window.innerWidth > 950 &&
                  !bigImage1 &&
                  !bigImage3 &&
                  setBigImage2(!bigImage2);
              }}
            />
          </div>
          <div className="imgContainer">
            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/images/${image3}`}
              alt="screen"
              className={bigImage3 ? "bigImage" : ""}
              onClick={() => {
                window.innerWidth > 950 &&
                  !bigImage1 &&
                  !bigImage2 &&
                  setBigImage3(!bigImage3);
              }}
            />
          </div>
        </div>
        <p>{description}</p>
        <div className="links">
          <a href={link} target="_blank" rel="noreferrer">
            View website
          </a>
          <a href={repo} target="_blank" rel="noreferrer">
            View repo Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Project;

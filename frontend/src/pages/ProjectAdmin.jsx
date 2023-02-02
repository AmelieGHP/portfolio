import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TiArrowLeftOutline } from "react-icons/ti";

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
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  const getProject = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/project/${id}`, [id])
      .then((result) => {
        setName(result.data[0].projectName);
        setDescription(result.data[0].projectDescription);
        setLink(result.data[0].websiteLink);
        setRepo(result.data[0].projectGithub);
        setImage1(
          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            result.data[0].image1
          }`
        );
        setImage2(
          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            result.data[0].image2
          }`
        );
        setImage3(
          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            result.data[0].image3
          }`
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateImg1 = (e) => {
    const [picture] = e.target.files;
    if (picture) {
      const reader = new FileReader();
      reader.onload = (el) => {
        setImage2(el.target.result);
      };
      reader.readAsDataURL(picture);
    }
  };

  const updateImg2 = (e) => {
    const [picture] = e.target.files;
    if (picture) {
      const reader = new FileReader();
      reader.onload = (el) => {
        setImage2(el.target.result);
      };
      reader.readAsDataURL(picture);
    }
  };

  const updateImg3 = (e) => {
    const [picture] = e.target.files;
    if (picture) {
      const reader = new FileReader();
      reader.onload = (el) => {
        setImage3(el.target.result);
      };
      reader.readAsDataURL(picture);
    }
  };

  const savePicture = (inputRefName, where) => {
    if (
      inputRefName.current !== null &&
      inputRefName.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("avatar", inputRefName.current.files[0]);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/avatar`, formData)
        .then((result) => {
          const newThing = result.data;
          const column = where;
          axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/project/${id}`, [
              column,
              newThing,
            ])
            .then(() => {
              getProject();
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const updateThing = (column, newThing) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/project/${id}`, [
        column,
        newThing,
      ])
      .then(() => {
        getProject();
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="project projectAdmin">
      <button
        type="button"
        className="backButton"
        onClick={() => {
          history.back();
        }}
      >
        <TiArrowLeftOutline /> Go back
      </button>

      <h2>{name}</h2>
      <div className="inputContainer">
        <h4>Change name</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            updateThing("projectName", name);
          }}
        >
          Save
        </button>
      </div>
      <div className="imgsContainer">
        <div className="imgContainer">
          <img src={image1} alt="screen" />
          <h4>Change this image : </h4>
          <input
            type="file"
            name="avatar"
            ref={inputRef1}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg1(e)}
          />
          <button
            type="button"
            onClick={() => savePicture(inputRef1, "image1")}
          >
            Save
          </button>
        </div>
        <div className="imgContainer">
          <img src={image2} alt="screen" />
          <h4>Change this image : </h4>
          <input
            type="file"
            name="avatar"
            ref={inputRef2}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg2(e)}
          />
          <button
            type="button"
            onClick={() => savePicture(inputRef2, "image2")}
          >
            Save
          </button>
        </div>
        <div className="imgContainer">
          <img src={image3} alt="screen" />
          <h4>Change this image : </h4>
          <input
            type="file"
            name="avatar"
            ref={inputRef3}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg3(e)}
          />
          <button
            type="button"
            onClick={() => savePicture(inputRef3, "image3")}
          >
            Save
          </button>
        </div>
      </div>
      <div className="inputContainer">
        <h4>Change description : </h4>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            updateThing("projectDescription", description);
          }}
        >
          Save
        </button>
      </div>
      <div className="links">
        <div className="inputContainer">
          <a href={link} target="_blank" rel="noreferrer">
            View website
          </a>
          <h4>Change link : </h4>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              updateThing("websiteLink", link);
            }}
          >
            Save
          </button>
        </div>
        <div className="inputContainer">
          <a href={repo} target="_blank" rel="noreferrer">
            View repo Github
          </a>{" "}
          <h4>Change repo : </h4>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              updateThing("projectGithub", repo);
            }}
          >
            Save
          </button>
        </div>
      </div>
      <button
        type="button"
        className="backButton"
        onClick={() => {
          history.back();
        }}
      >
        <TiArrowLeftOutline />
        Go back
      </button>
    </div>
  );
}

export default Project;

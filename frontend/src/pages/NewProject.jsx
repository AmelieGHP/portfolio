import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TiArrowLeftOutline } from "react-icons/ti";

const Project = () => {
  const params = useParams();
  const { id } = params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");
  const [image1, setImage1] = useState(
    "https://via.placeholder.com/320x145.png?text=Image+1"
  );
  const [image2, setImage2] = useState(
    "https://via.placeholder.com/320x145.png?text=Image+2"
  );
  const [image3, setImage3] = useState(
    "https://via.placeholder.com/320x145.png?text=Image+3"
  );
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

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
    console.log(inputRefName);
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

  const createProject = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/project`, [])
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  };

  return (
    <div className="project projectAdmin newProject">
      <button
        type="button"
        className="backButton"
        onClick={() => {
          history.back();
        }}
      >
        <TiArrowLeftOutline /> Cancel
      </button>

      <h2>{name}</h2>
      <div className="inputContainer">
        <h4>Enter your project name :</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="imgsContainer">
        <div className="imgContainer">
          <img src={image1} alt="screen" />
          <h4>Choose an image : </h4>
          <input
            type="file"
            name="avatar"
            ref={inputRef1}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg1(e)}
          />
        </div>
        <div className="imgContainer">
          <img src={image2} alt="screen" />
          <h4>Choose an image : </h4>
          <input
            type="file"
            name="avatar"
            ref={inputRef2}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg2(e)}
          />
        </div>
        <div className="imgContainer">
          <img src={image3} alt="screen" />
          <h4>Choose an image : </h4>
          <input
            type="file"
            name="avatar"
            ref={inputRef3}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg3(e)}
          />
        </div>
      </div>
      <div className="inputContainer">
        <h4>Description : </h4>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="links">
        <div className="inputContainer">
          <h4>Website link : </h4>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <h4>Link to Github repository : </h4>
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
        </div>
      </div>
      <div className="buttonContainer">
        <button type="button" onClick={() => createProject()}>
          Save project
        </button>
      </div>
      <button
        type="button"
        className="backButton"
        onClick={() => {
          history.back();
        }}
      >
        <TiArrowLeftOutline />
        Cancel
      </button>
    </div>
  );
};

export default Project;

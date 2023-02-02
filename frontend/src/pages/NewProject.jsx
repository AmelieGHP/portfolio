import React, { useState, useRef } from "react";
import axios from "axios";
import { TiArrowLeftOutline } from "react-icons/ti";

function Project() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [repo, setRepo] = useState("");
  const [image1src, setImage1src] = useState(
    "https://via.placeholder.com/320x145.png?text=Image+1"
  );
  const [image2src, setImage2src] = useState(
    "https://via.placeholder.com/320x145.png?text=Image+2"
  );
  const [image3src, setImage3src] = useState(
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
        setImage1src(el.target.result);
      };
      reader.readAsDataURL(picture);
    }
  };

  const updateImg2 = (e) => {
    const [picture] = e.target.files;
    if (picture) {
      const reader = new FileReader();
      reader.onload = (el) => {
        setImage2src(el.target.result);
      };
      reader.readAsDataURL(picture);
    }
  };

  const updateImg3 = (e) => {
    const [picture] = e.target.files;
    if (picture) {
      const reader = new FileReader();
      reader.onload = (el) => {
        setImage3src(el.target.result);
      };
      reader.readAsDataURL(picture);
    }
  };

  const createProject = () => {
    const formData = new FormData();
    if (inputRef1.current.files[0] !== undefined) {
      formData.append("photo1", inputRef1.current.files[0]);
    }
    if (inputRef2.current.files[0] !== undefined) {
      formData.append("photo2", inputRef2.current.files[0]);
    }
    if (inputRef3.current.files[0] !== undefined) {
      formData.append("photo3", inputRef3.current.files[0]);
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/screen`, formData)
      .then((result) => {
        let image1 = image1src;
        let image2 = image2src;
        let image3 = image3src;
        if (result.data.photo1 !== undefined) {
          image1 = result.data.photo1[0].filename;
        }
        if (result.data.photo2 !== undefined) {
          image2 = result.data.photo2[0].filename;
        }
        if (result.data.photo3 !== undefined) {
          image3 = result.data.photo3[0].filename;
        }
        const projectName = name;
        const projectDescription = description;
        const websiteLink = link;
        const projectGithub = repo;
        const idUser = 1;
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/project`, {
            projectName,
            projectDescription,
            websiteLink,
            projectGithub,
            image1,
            image2,
            image3,
            idUser,
          })
          .catch((err) => console.error(err));
      })
      .then(() => history.back())
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
          <img src={image1src} alt="screen" />
          <h4>Choose an image : </h4>
          <input
            type="file"
            name="photo1"
            ref={inputRef1}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg1(e)}
          />
        </div>
        <div className="imgContainer">
          <img src={image2src} alt="screen" />
          <h4>Choose an image : </h4>
          <input
            type="file"
            name="photo2"
            ref={inputRef2}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg2(e)}
          />
        </div>
        <div className="imgContainer">
          <img src={image3src} alt="screen" />
          <h4>Choose an image : </h4>
          <input
            type="file"
            name="photo3"
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
}

export default Project;

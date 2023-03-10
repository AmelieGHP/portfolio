import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TechnoAdmin from "@components/TechnoAdmin";
import ProjectCardAdmin from "@components/ProjectCardAdmin";

function Admin() {
  const inputRef = useRef(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [technos, setTechnos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [technoName, setTechnoName] = useState("");
  const [technoLevel, setTechnoLevel] = useState(1);

  const getUser = () => {
    const idUser = 1;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/${idUser}`)
      .then((result) => {
        setFirstname(result.data[0].firstname);
        setLastname(result.data[0].lastname);
        setGithub(result.data[0].github);
        setLinkedin(result.data[0].linkedin);
        setPicture(
          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            result.data[0].picture
          }`
        );
        setDescription(result.data[0].userDescription);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getTechnos = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/techno`)
      .then((result) => {
        const tempArray = [];
        if (result.data.length > 0) {
          for (let i = 0; i < result.data.length; i++) {
            tempArray.push(result.data[i]);
          }
        }
        setTechnos(tempArray);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  const updateImg = (e) => {
    // e.files contient un objet FileList
    const [newPic] = e.target.files;

    // "picture" est un objet File
    if (newPic) {
      // L'objet FileReader
      const reader = new FileReader();

      // L'??v??nement d??clench?? lorsque la lecture est compl??te
      reader.onload = (el) => {
        // On change l'URL de l'image (base64)
        setPicture(el.target.result);
      };

      // On lit le fichier "picture" upload??
      reader.readAsDataURL(newPic);
    }
  };

  const savePicture = () => {
    if (inputRef.current !== null && inputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append("avatar", inputRef.current.files[0]);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/avatar`, formData)
        .then((result) => {
          const picture1 = result.data;
          axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/userPicture`, [picture1])
            .then(() => {
              alert("Done!");
              getUser();
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const saveNewThing = (newThing, column) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user`, [
        { newThing },
        { column },
      ])
      .then((result) => {
        if (result.status === 204) {
          alert("Done!");
        }
        getUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createTechno = () => {
    const name = technoName;
    const level = technoLevel;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/techno`, [name, level])
      .then((result) => {
        if (result.status === 204) {
          alert("Done!");
        }
        getUser();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUser();
    getTechnos();
    getProjects();
  }, []);
  return (
    <div className="admin">
      <h2>Update your portfolio</h2>
      <p className="updateText">Please click the save button for each update</p>
      <div className="adminProfil section">
        <h3>Profile</h3>
        <div className="profilContainer">
          <div className="innerContainer">
            <div className="inputContainer">
              <h4>Firstname</h4>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <button
                type="button"
                onClick={() => saveNewThing(firstname, "firstname")}
              >
                Save
              </button>
            </div>
            <div className="inputContainer">
              <h4>Lastname</h4>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />

              <button
                type="button"
                onClick={() => saveNewThing(lastname, "lastname")}
              >
                Save
              </button>
            </div>
            <div className="inputContainer">
              <h4>Github </h4>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
              <button
                type="button"
                onClick={() => saveNewThing(github, "github")}
              >
                Save
              </button>
            </div>
            <div className="inputContainer">
              <h4>Linkedin</h4>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
              <button
                type="button"
                onClick={() => saveNewThing(linkedin, "linkedin")}
              >
                Save
              </button>
            </div>
          </div>
          <div className="innerContainer">
            <div className="inputContainer">
              <h4>Avatar</h4>
              <img src={picture} alt="profil" width="150px" />
              <input
                type="file"
                name="avatar"
                ref={inputRef}
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => updateImg(e)}
              />
              <button type="button" onClick={() => savePicture()}>
                Save
              </button>
            </div>
            <div className="inputContainer">
              <h4>Description</h4>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="button"
                onClick={() => saveNewThing(description, "userDescription")}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="adminTechno section">
        <h3>Technos</h3>
        <div className="technoAdminContainer">
          {technos.length > 0 &&
            technos.map((techno) => (
              <TechnoAdmin
                key={techno.technoid}
                name={techno.technoName}
                levelTechno={techno.level}
                id={techno.idtechno}
                getTechnos={getTechnos()}
              />
            ))}
        </div>
        <div className="technoAdmin newTechno">
          <h4>Add a new techno :</h4>
          <input
            type="text"
            value={technoName}
            placeholder="Techno name"
            onChange={(e) => setTechnoName(e.target.value)}
          />
          <div className="progressContainer">
            <button
              type="button"
              className="progressButton"
              onClick={() => {
                technoLevel > 0 && setTechnoLevel(technoLevel - 1);
              }}
            >
              -
            </button>
            <progress value={technoLevel} max={10}>
              {technoLevel}
            </progress>{" "}
            <button
              type="button"
              className="progressButton"
              onClick={() => {
                technoLevel < 10 && setTechnoLevel(technoLevel + 1);
              }}
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              createTechno();
              setTechnoLevel(1);
              setTechnoName("");
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="adminProject projects section">
        <h3>Projects</h3>
        <div className="projectsContainer">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCardAdmin
                name={project.projectName}
                image1={project.image1}
                id={project.idproject}
                getProjects={getProjects()}
              />
            ))}
          <div className="projectCard newProject">
            <div className="imgContainer">
              <img
                src="https://via.placeholder.com/320x145.png?text=New"
                alt="placeholder"
              />
            </div>
            <h4>Add a new project</h4>
            <Link to="/admin/new-project">
              <button type="button">Add</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;

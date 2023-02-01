import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Admin() {
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [technos, setTechnos] = useState([]);
  const [projects, setProjects] = useState([]);
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
        console.log(result.data);
        const tempArray = [];
        if (result.data.length > 0) {
          for (let i = 0; i < result.data.length; i++) {
            tempArray.push(result.data[i]);
          }
        }
        setTechnos(tempArray);
        console.log(tempArray);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getProjects = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/project`)
      .then((result) => {
        console.log(result.data);
        const tempArray = [];
        if (result.data.length > 0) {
          for (let i = 0; i < result.data.length; i++) {
            tempArray.push(result.data[i]);
          }
        }
        setProjects(tempArray);
        console.log(tempArray);
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

      // L'événement déclenché lorsque la lecture est complète
      reader.onload = (el) => {
        // On change l'URL de l'image (base64)
        setPicture(el.target.result);
      };

      // On lit le fichier "picture" uploadé
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
          const picture = result.data;
          axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/userPicture`, [picture])
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

  useEffect(() => {
    getUser();
    getTechnos();
    getProjects();
  }, []);
  return (
    <div>
      <h3>
        Hello {firstname} {lastname}, here are your infos :
      </h3>
      <p>Please click the save button where you're done</p>
      <div className="adminProfil">
        <div>
          <img src={picture} alt="profil" width="150px" />
          <input
            type="file"
            name="avatar"
            ref={inputRef}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => updateImg(e)}
          />
          <button type="button" onClick={() => savePicture()}>
            Save Picture
          </button>
        </div>
        <div>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <button
            type="button"
            onClick={() => saveNewThing(firstname, "firstname")}
          >
            Save firstname
          </button>
        </div>
        <div>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <button
            type="button"
            onClick={() => saveNewThing(lastname, "lastname")}
          >
            Save lastname
          </button>
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="button"
            onClick={() => saveNewThing(description, "userDescription")}
          >
            Save description
          </button>
        </div>
        <div>
          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <button type="button" onClick={() => saveNewThing(github, "github")}>
            Save github
          </button>
        </div>
        <div>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <button
            type="button"
            onClick={() => saveNewThing(description, "userDescription")}
          >
            Save linkedin
          </button>
        </div>
      </div>
      <div className="adminTechno">
        {technos.length > 0 &&
          technos.map((techno) => (
            <div>
              <p>{techno.technoName}</p>
              <p>{techno.level}</p>
              <button
                type="button"
                onClick={() => deleteTechno(techno.idtechno)}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => updateTechno(techno.idtechno)}
              >
                Update
              </button>
            </div>
          ))}
        <button type="button" onClick={() => createTechno()}>
          Add
        </button>
      </div>
      <div className="adminProject">
        {projects.length > 0 &&
          projects.map((project) => (
            <div>
              <p>Name : {project.projectName}</p>
              <p>Description : {project.projectDescription}</p>
              <a href={project.websiteLink}>Website link</a>
              <a href={project.projectGithub}>Githbub repository</a>
              <button
                type="button"
                onClick={() => deleteTechno(project.idproject)}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => updateTechno(project.idproject)}
              >
                Update
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Admin;

import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Nav from "@components/Nav";
import About from "@components/About";
import Projects from "@components/Projects";
import Contact from "@components/Contact";

function Home() {
  const location = useLocation();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [technos, setTechnos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showNav, setShowNav] = useState(false);
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
  useEffect(() => {
    getUser();
    getTechnos();
    getProjects();
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      document.getElementById(location.state.goTo).scrollIntoView();
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    });
  }, []);

  return (
    <div className="home">
      <Header firstname={firstname} lastname={lastname} picture={picture} />
      <div id="content">
        <Nav />
        <About />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default Home;

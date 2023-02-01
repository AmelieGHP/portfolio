import React, { useEffect, useState } from "react";
import Header from "@components/Header";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "@components/Nav";
import About from "@components/About";
import Projects from "@components/Projects";
import Contact from "@components/Contact";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
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

  useEffect(() => {
    // navigate("/", { state: { goTo: "home" } });
    getUser();
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      document.getElementById(location.state.goTo).scrollIntoView();
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= window.innerHeight) {
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
        {showNav && <Nav />}
        <About
          picture={picture}
          description={description}
          linkedin={linkedin}
          github={github}
        />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default Home;

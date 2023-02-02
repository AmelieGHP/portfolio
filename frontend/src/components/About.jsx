import React, { useEffect, useState } from "react";
import Techno from "@components/Techno";
import axios from "axios";
import { SlSocialLinkedin, SlSocialGithub } from "react-icons/sl";

function About({ picture, description, linkedin, github }) {
  const [technos, setTechnos] = useState([]);

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

  useEffect(() => {
    getTechnos();
  }, []);

  return (
    <div className="section about">
      <h2>About me</h2>
      <div className="inner">
        <div className="leftPart">
          <div className="imgContainer">
            <img src={picture} alt="profile" />
          </div>
          <p>{description}</p>
          <div className="links">
            <a href={linkedin} target="_blank" rel="noreferrer">
              <SlSocialLinkedin />
            </a>
            <a href={github} target="_blank" rel="noreferrer">
              <SlSocialGithub />
            </a>
          </div>
        </div>
        <div className="technos">
          {technos.length > 0 &&
            technos.map((techno) => {
              return <Techno name={techno.technoName} level={techno.level} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default About;

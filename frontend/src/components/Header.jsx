import React from "react";
import { TbArrowLoopRight2 } from "react-icons/tb";
import { Link } from "react-router-dom";

function Header({ firstname, lastname, picture }) {
  return (
    <header id="home">
      <div className="title">
        <h1>
          Hi, I'm {firstname} {lastname}
        </h1>
        <h3>I'm a full-stack web developper</h3>
        <Link to="/" state={{ goTo: "content" }}>
          <button type="button">
            View my work <TbArrowLoopRight2 className="arrow" />
          </button>
        </Link>
      </div>
      <div className="imgContainer">
        <img src={picture} alt="profile" />
      </div>
    </header>
  );
}

export default Header;

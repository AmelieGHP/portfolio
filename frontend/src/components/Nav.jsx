import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/" state={{ goTo: "home" }}>
        Home
      </Link>
      <Link to="/" state={{ goTo: "about" }}>
        About me
      </Link>
      <Link to="/" state={{ goTo: "projects" }}>
        Projects
      </Link>
      <Link to="/" state={{ goTo: "contact" }}>
        Contact
      </Link>
    </div>
  );
};

export default Nav;

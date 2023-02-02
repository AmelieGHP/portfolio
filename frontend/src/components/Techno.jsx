import React from "react";
import Proptypes from "prop-types";

function Techno({ name, level }) {
  return (
    <div className="techno">
      <p>{name}</p>
      <progress value={level} max={10}>
        {level}
      </progress>
    </div>
  );
}
Techno.propTypes = {
  name: Proptypes.string,
  level: Proptypes.number,
};
export default Techno;

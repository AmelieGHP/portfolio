import React from "react";

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

export default Techno;

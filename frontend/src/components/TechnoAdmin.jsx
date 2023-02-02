import axios from "axios";
import React, { useState } from "react";
import Proptypes from "prop-types";

function TechnoAdmin({ name, levelTechno, id, getTechnos }) {
  const [adminLevel, setAdminLevel] = useState(levelTechno);

  const updateTechno = () => {
    const level = adminLevel;
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/techno/${id}`, [level])
      .then((result) => {
        if (result.status === 204) {
          alert("Done!");
        }
        getTechnos;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTechno = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/techno/${id}`)
      .then((result) => {
        if (result.status === 204) {
          getTechnos;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="technoAdmin">
      <p>{name}</p>
      <div className="progressContainer">
        <button
          type="button"
          className="progressButton"
          onClick={() => {
            adminLevel > 0 && setAdminLevel(adminLevel - 1);
          }}
        >
          -
        </button>
        <progress value={adminLevel} max={10}>
          {adminLevel}
        </progress>
        <button
          type="button"
          className="progressButton"
          onClick={() => {
            adminLevel < 10 && setAdminLevel(adminLevel + 1);
          }}
        >
          +
        </button>
      </div>
      <div className="buttonContainer">
        <button type="button" onClick={() => updateTechno()}>
          Save
        </button>
        <button type="button" onClick={() => deleteTechno()} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
}
TechnoAdmin.propTypes = {
  name: Proptypes.string.isRequired,
  levelTechno: Proptypes.number.isRequired,
  id: Proptypes.number.isRequired,
  getTechnos: Proptypes.func.isRequired,
};
export default TechnoAdmin;

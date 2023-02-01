const database = require("../../database");

const getAllTechnos = async () => {
  const [result] = await database.query(
    "SELECT * FROM techno where user_iduser = ?",
    [1]
  );
  return result;
};

const getTechnoById = async (req) => {
  const [result] = await database.query(
    "SELECT * FROM techno WHERE idtechno = ?",
    [req.params.id]
  );
  return result;
};

const updateTechnoById = async (req) => {
  const [result] = await database.query(
    `UPDATE techno SET ${trucAChanger} = ? WHERE idtechno = ?`,
    [req.trucAChanger, req.params.id]
  );
  return result;
};

const createTechno = async (req) => {
  const { technoName, level, idUser } = req.body;

  const [result] = await database.query(
    "INSERT INTO techno (technoName, level, iduser) VALUES (?, ?, ?)",
    [technoName, level, idUser]
  );
  return result;
};

const deleteTechnoById = async (req) => {
  const { id } = req.params;

  const [result] = await database.query("DELETE FROM techno WHERE id=?", [id]);
  return result;
};

module.exports = {
  getAllTechnos,
  getTechnoById,
  updateTechnoById,
  createTechno,
  deleteTechnoById,
};

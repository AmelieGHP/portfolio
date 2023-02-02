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
  const level = req.body[0];
  const [result] = await database.query(
    `UPDATE techno SET level = ? WHERE idtechno = ?`,
    [level, req.params.id]
  );
  return result;
};

const createTechno = async (req) => {
  const name = req.body[0];
  const level = req.body[1];
  console.log(req.body);
  const [result] = await database.query(
    "INSERT INTO techno (technoName, level, user_iduser) VALUES (?, ?, ?)",
    [name, level, 1]
  );
  return result;
};

const deleteTechnoById = async (req) => {
  const { id } = req.params;

  const [result] = await database.query("DELETE FROM techno WHERE idtechno=?", [
    id,
  ]);
  return result;
};

module.exports = {
  getAllTechnos,
  getTechnoById,
  updateTechnoById,
  createTechno,
  deleteTechnoById,
};

const database = require("../../database");

const getUserById = async (req) => {
  const [result] = await database.query("SELECT * FROM user WHERE iduser = ?", [
    req.params.id,
  ]);
  return result;
};

const updateUser = async (req) => {
  const { newThing } = req.body[0];
  const { column } = req.body[1];
  const [result] = await database.query(
    `UPDATE user SET ${column} = ? WHERE iduser = 1`,
    [newThing]
  );
  return result;
};

const updatePicture = async (req) => {
  const { picture } = req.body;
  const [result] = await database.query(
    `UPDATE user SET picture = ? WHERE iduser = 1`,
    [picture]
  );
  return result;
};

const createUser = async (req) => {
  const {
    firstname,
    lastname,
    email,
    password,
    linkedin,
    github,
    description,
  } = req.body;

  const [result] = await database.query(
    "INSERT INTO user (firstname, lastname, email, password, github, linkedin, userDescription) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, password, github, linkedin, description]
  );
  return result;
};

const deleteUserById = async (req) => {
  const { id } = req.params;

  const [result] = await database.query("DELETE FROM user WHERE id=?", [id]);
  return result;
};

module.exports = {
  getUserById,
  updateUser,
  updatePicture,
  createUser,
  deleteUserById,
};

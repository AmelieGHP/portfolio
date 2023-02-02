const userModels = require("../models/user.models");

const getAllUsers = async (req, res) => {
  const result = await userModels.getAllUsers(req);
  if (result.length === 0) {
    res.sendStatus(500);
  }
  return res.json(result);
};

const getUserById = async (req, res) => {
  const result = await userModels.getUserById(req);
  if (result.length === 0) {
    res.sendStatus(500);
  }
  return res.json(result);
};

const updateUser = async (req, res) => {
  const result = await userModels.updateUser(req);
  if (result.affectedRows === 0) {
    res.status(404).send("Not found");
  } else {
    res.sendStatus(204);
  }
};
const updatePicture = async (req, res) => {
  const result = await userModels.updatePicture(req);
  if (result.affectedRows === 0) {
    res.status(404).send("Not found");
  } else {
    res.sendStatus(204);
  }
};

const createUser = async (req, res) => {
  const result = await userModels.createUser(req);
  return res.json(result);
};

const deleteUserById = async (req, res) => {
  const result = await userModels.deleteUserById(req);
  if (result.affectedRows === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  updatePicture,
  createUser,
  deleteUserById,
};

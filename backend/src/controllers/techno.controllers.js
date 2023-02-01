const technoModels = require("../models/techno.models");

const getAllTechnos = async (req, res) => {
  const result = await technoModels.getAllTechnos(req);
  if (result.length === 0) {
    res.sendStatus(500);
  }
  return res.json(result);
};

const getTechnoById = async (req, res) => {
  const result = await technoModels.getTechnoById(req);
  if (result.length === 0) {
    res.sendStatus(500);
  }
  return res.json(result);
};

const updateTechnoById = async (req, res) => {
  const result = await technoModels.updateTechnoById(req);
  if (result.affectedRows === 0) {
    res.status(404).send("Not found");
  } else {
    res.sendStatus(204);
  }
};

const createTechno = async (req, res) => {
  const result = await technoModels.createTechno(req);
  return res.json(result);
};

const deleteTechnoById = async (req, res) => {
  const result = await technoModels.deleteTechnoById(req);
  if (result.affectedRows === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
};

module.exports = {
  getAllTechnos,
  getTechnoById,
  updateTechnoById,
  createTechno,
  deleteTechnoById,
};

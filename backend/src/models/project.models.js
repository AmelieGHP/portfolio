const database = require("../../database");

const getAllProjects = async () => {
  const [result] = await database.query(
    "SELECT * FROM project where user_iduser = ?",
    [1]
  );
  return result;
};

const getProjectById = async (req) => {
  const [result] = await database.query(
    "SELECT * FROM project WHERE idproject = ?",
    [req.params.id]
  );
  return result;
};

const updateProjectById = async (req) => {
  const [result] = await database.query(
    `UPDATE project SET ${trucAChanger} = ? WHERE idproject = ?`,
    [req.trucAChanger, req.params.id]
  );
  return result;
};

const createProject = async (req) => {
  const {
    projectName,
    projectDescription,
    websiteLink,
    projectGithub,
    image1,
    image2,
    image3,
    idUser,
  } = req.body;

  const [result] = await database.query(
    "INSERT INTO project(projectName, projectDescription, websiteLink, projectGithub, image1, image2, image3, user_iduser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      projectName,
      projectDescription,
      websiteLink,
      projectGithub,
      image1,
      image2,
      image3,
      idUser,
    ]
  );
  return result;
};

const deleteProjectById = async (req) => {
  const { id } = req.params;

  const [result] = await database.query("DELETE FROM project WHERE id=?", [id]);
  return result;
};

module.exports = {
  getAllProjects,
  getProjectById,
  updateProjectById,
  createProject,
  deleteProjectById,
};

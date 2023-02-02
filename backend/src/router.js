const express = require("express");
const multer = require("multer");
const router = express.Router();

const user = require("./controllers/user.controllers");

const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/images");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    cb(null, date.getMinutes() + file.originalname);
  },
});

const uploadAvatar = multer({ storage: storageAvatar });

router.post("/avatar", uploadAvatar.single("avatar"), (req, res) => {
  res.status(200).send(req.file.filename);
});

router.post(
  "/screen",
  uploadAvatar.fields([
    { name: "photo1", maxCount: 1 },
    { name: "photo2", maxCount: 1 },
    { name: "photo3", maxCount: 1 },
  ]),
  (req, res) => {
    res.status(200).send(req.files);
  }
);

router.get("/user/:id", user.getUserById);

router.post("/user", user.createUser);

router.put("/user", user.updateUser);
router.put("/userPicture", user.updatePicture);

const project = require("./controllers/project.controllers");

router.get("/project", project.getAllProjects);
router.get("/project/:id", project.getProjectById);

router.post("/project", project.createProject);

router.put("/project/:id", project.updateProjectById);

router.delete("/project/:id", project.deleteProjectById);

const techno = require("./controllers/techno.controllers");

router.get("/techno", techno.getAllTechnos);
router.get("/techno/:id", techno.getTechnoById);

router.post("/techno", techno.createTechno);

router.put("/techno/:id", techno.updateTechnoById);

router.delete("/techno/:id", techno.deleteTechnoById);

module.exports = router;

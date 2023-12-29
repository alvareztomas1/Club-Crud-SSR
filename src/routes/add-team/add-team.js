const express = require("express");
const multer = require("multer");
const path = require("path");
const { validateForm } = require("../../services/validation");
const { addTeam, getTeamsList } = require("../../services/team");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cb) {
    cb(null, req.body.tla);
  },
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.render("add-team", {
    validation: false,
  });
});

router.post("/", upload.single("crestUrl"), (req, res) => {
  const filePath = path.join(__dirname, "../../data/teams.json");
  const enteredData = req.body;
  const teamsList = getTeamsList(filePath);
  const validation = validateForm(enteredData);

  if (!Object.values(validation).includes(false)) {
    addTeam(teamsList, enteredData, req.file, filePath);

    res.redirect("/?hidden=true&message=Team added succesfully&type=success");
  } else {
    res.render("add-team", {
      teamData: req.body,
      validation,
    });
  }
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const { mapTeamList } = require("../../mapper/mapper");
const { getTeamsList, editTeam, getTeam } = require("../../services/team");
const { validateForm } = require("../../services/validation");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename(req, file, cb) {
    cb(null, req.body.tla);
  },
});

const upload = multer({ storage });
const router = express.Router();
const teamsFilePath = path.join(__dirname, "../../data/teams.json");

router.get("/:teamName/:id", (req, res) => {
  const { teamName } = req.params;
  const teamsList = getTeamsList(teamsFilePath);
  const teamsData = mapTeamList(teamsList);
  const teamData = getTeam(teamsData, teamName);

  res.render("edit-team", {
    teamData,
    validation: false,
  });
});

router.post("/:teamName/:id", upload.single("crestUrl"), async (req, res) => {
  const { teamName } = req.params;
  const enteredData = req.body;
  const teamsList = getTeamsList(teamsFilePath);
  const teamsData = mapTeamList(teamsList);
  const selectedTeam = getTeam(teamsData, teamName);
  const validation = validateForm(enteredData);

  if (!Object.values(validation).includes(false)) {
    editTeam(selectedTeam, enteredData, req.file, teamsData, teamsFilePath);

    res.redirect("/?hidden=true&message=Team edited succesfully&type=primary");
    /*res.render("home", {
      teamsData,
      toast: {
        hidden: true,
        message: "Team edited",
        type: "primary",
      },
    });*/
  } else {
    res.render("edit-team", {
      teamData: selectedTeam,
      validation,
    });
  }
});

module.exports = router;

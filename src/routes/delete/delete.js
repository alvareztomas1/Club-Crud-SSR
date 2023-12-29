const express = require("express");
const path = require("path");
const { mapTeamList } = require("../../mapper/mapper");
const { getTeamsList, deleteTeam, getTeam } = require("../../services/team");

const router = express.Router();

router.post("/:teamName/:id", (req, res) => {
  const teamsFilePath = path.join(__dirname, "../../data/teams.json");
  const { teamName } = req.params;
  const teamsList = getTeamsList(teamsFilePath);
  const teamsData = mapTeamList(teamsList);
  const selectedTeam = getTeam(teamsData, teamName);

  deleteTeam(selectedTeam, teamsData, teamsFilePath, teamName);

  res.redirect("/?hidden=true&message=Team deleted succesfully&type=danger");
});

module.exports = router;

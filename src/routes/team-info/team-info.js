const express = require("express");
const path = require("path");

const router = express.Router();
const { mapTeamList } = require("../../mapper/mapper");
const { getTeamsList, getTeam } = require("../../services/team");

const teamsFilePath = path.join(__dirname, "../../data/teams.json");

router.get("/:teamName/:id", (req, res) => {
  const { teamName } = req.params;
  const teamsList = getTeamsList(teamsFilePath);
  const teamsListData = mapTeamList(teamsList);
  const teamInfo = getTeam(teamsListData, teamName);

  res.render("team-info", {
    teamInfo,
  });
});

module.exports = router;

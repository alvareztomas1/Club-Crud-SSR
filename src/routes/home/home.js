const express = require("express");
const path = require("path");
const { mapTeamList } = require("../../mapper/mapper");
const { getTeamsList } = require("../../services/team");

const router = express.Router();

router.get("/", (req, res) => {
  const teamsFilePath = path.join(__dirname, "../../data/teams.json");
  const teamsList = getTeamsList(teamsFilePath);
  const teamsData = mapTeamList(teamsList);
  const {
    hidden,
    message,
    type,
  } = req.query;

  res.render("home", {
    teamsData,
    toast: {
      hidden: hidden || false,
      message: message || "",
      type: type || "",
    },
  });
});

module.exports = router;

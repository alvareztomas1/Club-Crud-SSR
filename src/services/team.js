const fs = require("fs");
const { mapTeam } = require("../mapper/mapper");

function addTeam(teamsList, newTeamData, logo, filePath) {
  const newTeam = mapTeam(newTeamData);
  newTeam.id = Math.floor(Math.random() * Date.now());
  newTeam.crestUrl = `/images/${logo.filename}`;
  teamsList.push(newTeam);

  fs.writeFileSync(filePath, JSON.stringify(teamsList));
}

function editTeam(editedTeamData, newTeamData, logo, teamsList, filePath) {
  Object.keys(newTeamData).forEach((key) => {
    editedTeamData[key] = newTeamData[key];
  });
  if (logo) {
    editedTeamData.crestUrl = `/images/${logo.filename}`;
  }

  fs.writeFileSync(filePath, JSON.stringify(teamsList));
}

function deleteTeam(selectedTeam, teamsList, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(teamsList.filter((team) => team.name !== selectedTeam.name)));
}
function getTeamsList(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
function getTeam(teamsList, teamName) {
  return teamsList.find((team) => team.tla === teamName);
}

module.exports = {
  addTeam, editTeam, deleteTeam, getTeamsList, getTeam,
};

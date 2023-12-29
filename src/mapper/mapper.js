const Team = require("../entities/Team");

function mapTeam(teamData) {
  const {
    id,
    name,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    venue,
  } = teamData;

  return new Team(
    id,
    name,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    venue,
  );
}

function mapTeamList(teamsData) {
  const data = [];
  for (let i = 0; i < teamsData.length; i++) {
    data.push(mapTeam(teamsData[i]));
  }

  return data;
}

/*function mapTeamList(teamsData) {
  const data = {};
  for (let i = 0; i < teamsData.length; i++) {
    data[`${teamsData[i].tla}`] = mapTeam(teamsData[i], i);
  }

  return data;
}*/


module.exports = { mapTeam, mapTeamList };

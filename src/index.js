const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const home = require("./routes/home/home");
const teamInfo = require("./routes/team-info/team-info");
const addTeam = require("./routes/add-team/add-team");
const editTeam = require("./routes/edit-team/edit-team");
const deleteTeam = require("./routes/delete/delete");

const PORT = 8080;
const app = express();
const hbs = exphbs.create();

app.set("views", "./src/views");
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/node_modules", express.static(path.join(__dirname, "../node_modules")));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", home);
app.use("/info", teamInfo);
app.use("/add-team", addTeam);
app.use("/edit", editTeam);
app.use("/delete", deleteTeam);
app.use((req, res) => {
  res.status(404).send("ERROR! Page not found");
});

app.listen(PORT);

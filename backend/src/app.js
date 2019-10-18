const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.get("/*", (req, res) => {
  res.render("index.html");
});

module.exports = app;

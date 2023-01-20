const express = require("express");
const { nextTick } = require("process");
const app = express();

app.get("/", function (req, res) {
  res.send("ОК принят");
});
app.get("/denis", function (req, res) {
  res.send("ОК denis принято");
});

app.listen(3000, () => {
  console.log("localhost:3000 стартовал");
});

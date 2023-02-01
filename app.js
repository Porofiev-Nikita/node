const express = require("express");
const app = express();
const path = require("path");
console.log("Filename", path.basename(__filename));
console.log("Dirname", path.dirname(__filename));
console.log("Extension", path.extname(__filename));
console.log("Path object", path.parse(__filename).dir);
app.get("/", function (req, res) {
  res.send("ОК принят");
});
app.get("/denis", function (req, res) {
  res.send("ОК denis принято");
});

app.listen(3000, () => {
  console.log("localhost:3000 стартовал");
});

const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");

app.get("/", function (req, res) {
  res.send("ОК принят");
});
app.get("/denis", function (req, res) {
  res.send("ОК denis принято");
});

//Обработка ошибок

//error handling
app.use((req, res, next) => {
  const err = new Error("Ошибка: ресурс не найден");
  err.status = 404;
  next(err);
});
//development mode
if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render("error.ejs", { status: err.status, err: err.message });
  });
}
//production mode
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render("error.ejs", { status: err.status, err: {} });
});

app.listen(3000, () => {
  console.log("localhost:3000 стартовал");
});

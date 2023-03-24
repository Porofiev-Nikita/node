const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const entries = require("./routes/entries");

app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)));
app.use ('/css/bootstrap.css','node_modules/bootstrap/dist/css/bootstrap.css');
app.use(methodOverride())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);

app.get("/", entries.list);
app.get("/post", entries.form);

app.get('/register',register.form)
app.post('/register',register.submit)

app.get('/login',login.form)
app.get('/login',login.logout)
app.post('/login',login.submit)



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

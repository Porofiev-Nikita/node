const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const favicon = require("serve-favicon");
// const bodyParser = require("body-parser");
const entries = require("./routes/entries");
const register = require("./routes/register");
const login = require("./routes/login");
const messages = require("./middleware/messages");
const users = require("./middleware/users");
const validate = require("./middleware/validate");

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)));
app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: "secret1", resave:false, saveUninitialized:true}));
app.use(messages)
app.use(users)

//вывод листа записей при обращении в корень
app.get("/", entries.list);
//вывод формы для заполнения записей
app.get("/post", entries.form);
//прием данных по форме создания поста
app.post("/post", validate.required ('entry[title]'),validate.lengthAbove('entry[title]',4),entries.submit);
//вывод формы регистрации
app.get("/register", register.form);
//прием данных по форме регистрации
app.post("/register", register.submit);
//вывод формы для логина
app.get("/login", login.form);
//осуществление выхода
app.get("/logout", login.logout);
//прием данных по форме логина
app.post("/login", login.submit);

//Обработка ошибок

//error handling
app.use((req, res, next) => {
  const err = new Error("Ошибка: ресурс не найден");
  err.status = 404;
  next(err);
});
//development mode
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error.ejs", { error: err, message: err.message });
  });
}
//production mode
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error.ejs", { message: err.message, err: {} });
});

app.listen(3000, () => {
  console.log("localhost:3000 стартовал");
});

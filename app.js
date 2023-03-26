const express = require("express");
const app = express();
const path = require("path");
// const session = require("express-session");
const favicon = require("serve-favicon");
// const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
const entries = require("./routes/entries");
const register = require("./routes/register");
// const login = require("./routes/login");

app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)));
app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride());
// app.use(cookieParser());
// app.use(session({secret: "secret1", resave:false, saveUninitialized:true}));

//вывод листа записей при обращении в корень
app.get("/", entries.list);
//вывод формы для заполнения записей
app.get("/post", entries.form);
//прием данных по форме создания поста
// app.post("/post", f1, f2, f3, entries.submit);
//вывод формы регистрации
app.get("/register", register.form);
//прием данных по форме регистрации
app.post("/register", register.submit);
//вывод формы для логина
// app.get("/login", login.form);
//осуществление выхода
// app.get("/login", login.logout);
//прием данных по форме логина
// app.post("/login", login.submit);

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

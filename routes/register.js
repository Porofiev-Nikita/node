const User = require("../models/user");

exports.form = (req, res) => {
  res.render("register", { title: "Register" });
};
exports.submit = (req, res, next) => {
  const data = req.body.user;
  User.findByName(data.name, (err, user) => {
    if (err) return next(err);
    if (user) {
      res.error("Такой пользователь в базе уже есть");
      res.redirect("/");
    } else {
      User.create(data, (err) => {
        if (err) return next(err); //доработать запись в session.uname
        res.redirect("/");
      });
    }
  });
};

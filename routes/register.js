const User = require("../models/user");

exports.form = (req, res) => {
  res.render("register", { title: "Register" });
};
exports.submit = (req, res) => {
  const data = req.body.user;
  User.findByName(data.name, (err, user) => {
    if (user) {
      return res.send("Такой пользователь в базе уже есть");
    }
    User.create((data.name, data.pass), (err) => {
      if (err) return next(err);
    });
  });
};

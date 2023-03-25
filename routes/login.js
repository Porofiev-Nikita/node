const User = require("../models/user");

exports.form = (req, res) => {
  res.render("login", { title: "Login" });
};
exports.submit = (req, res, next) => {};

exports.logout = (req, res) => {};

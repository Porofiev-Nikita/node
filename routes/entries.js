const Entry = require("../models/entry");

exports.list = function (req, res, next) {
  Entry.selectAll((err, entries) => {
    if (err) return next(err);
    console.log(entries);
    res.render("entries", { title: "Entries", entries: entries });
  });
};

exports.form = (req, res) => {
  res.render("post", { title: "Post" });
};

exports.submit = (req, res, next) => {
  const data = req.body.entry;
  const user = req.body.user;
  const username = user ? user.name : null;
  const entry = {
    username: username,
    title: data.title,
    content: data.content,
  };

  Entry.create(entry, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

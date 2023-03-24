const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp");
const bcrypt = require("bcrypt");

db.serialize(() => {
  const stmt =
    "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, email TEXT UNIQUE, password TEXT)";
  db.run(stmt);
});

class User {
  constructor() {}
  //запись в базу юзера
  static create(data, cb) {
    const sql = "INSERT INTO user (name, email, password) VALUE (?,?,?)";
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(data.password, salt, (err, hash) => {
        if (err) return next(err);
        // Store hash in your password DB.
        db.serialize(() => {
          db.run(sql, data.name, hash);
          db.get("SELECT name FROM users WHERE name=?", data.name, cb);
        });
      });
    });
  }

  //поиск юзера в базе
  static findByName(name, cb) {
    db.get("SELECT * FROM user WHERE name=?, name,cb");
  }
  //проверка аутентификации
  static authentificate(name, pass, cb) {
    User.findByName(name, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) return cb(null, user);
        cb(null, result);
      });
    });
  }
}
module.exports = User;

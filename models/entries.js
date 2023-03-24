const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp");
db.serialize(() => {
  const sql1 =
    "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,title TEXT, content TEXT, date DATE)";
  db.run(sql1);
});

class Entries {
  //выборка
  static selectAll(cb) {
    db.all("SELECT * FROM ENTRIES", cb);
  }

  //запись
  static create(data, cb) {
    const sql = "INSERT INTO entries (name, content, date) VALUE (?,?,?)";
    db.run(sql, data.title, data.content, data.date);
    cb(null, sql);
  }
}
module.exports = Entries;
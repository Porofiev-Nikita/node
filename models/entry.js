const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("dbApp.db");
db.serialize(() => {
  const sql1 =
    "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT,title TEXT, content TEXT)";
  db.run(sql1);
});

class Entry {
  //выборка
  static selectAll(cb) {
    db.all("SELECT * FROM entries", cb);
  }

  //запись
  static create(data, cb) {
    const sql = "INSERT INTO entries (username, title, content) VALUES (?,?,?)";
    db.run(sql, data.username, data.title, data.content, cb);
  }
}
module.exports = Entry;

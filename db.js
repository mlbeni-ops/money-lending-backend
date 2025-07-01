const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("lending.db");

// Create tables if they don’t exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      amount REAL,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      loan_id INTEGER,
      amount REAL,
      date TEXT,
      FOREIGN KEY (loan_id) REFERENCES loans(id)
    )
  `);
});

module.exports = db;

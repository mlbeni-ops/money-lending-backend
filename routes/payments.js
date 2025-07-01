const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM payments", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { loan_id, amount } = req.body;
  const date = new Date().toISOString();

  db.run(
    "INSERT INTO payments (loan_id, amount, date) VALUES (?, ?, ?)",
    [loan_id, amount, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, loan_id, amount, date });
    }
  );
});

module.exports = router;
fetch("http://localhost:5000/api/customers")

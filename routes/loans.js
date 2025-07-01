const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM loans", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { customer_id, amount } = req.body;
  db.run(
    "INSERT INTO loans (customer_id, amount) VALUES (?, ?)",
    [customer_id, amount],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, customer_id, amount });
    }
  );
});

module.exports = router;
fetch("http://localhost:5000/api/customers")

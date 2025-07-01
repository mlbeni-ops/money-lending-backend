const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO customers (name) VALUES (?)", [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

module.exports = router;
fetch("http://localhost:5000/api/customers")
// DELETE a customer by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM customers WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id });
  });
});

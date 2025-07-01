const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const customersRoutes = require("./routes/customers");
const loansRoutes = require("./routes/loans");
const paymentsRoutes = require("./routes/payments");

app.use("/api/customers", customersRoutes);
app.use("/api/loans", loansRoutes);
app.use("/api/payments", paymentsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

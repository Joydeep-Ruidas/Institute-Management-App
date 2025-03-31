const express = require("express");

const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const feeRoutes = require("./routes/feeRoutes");

require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(express.json({ extended: true }));

app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.use("/course", courseRoutes);
app.use("/fee", feeRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    msg: "Bad Request",
  });
});

module.exports = app;

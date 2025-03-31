const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const feeRoutes = require("./routes/feeRoutes");

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
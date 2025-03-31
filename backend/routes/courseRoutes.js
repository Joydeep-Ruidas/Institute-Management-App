const express = require("express");
const router = express.Router();

router.post("/add-course", (req, res) => {
  res.status(200).json({
    msg: "Add new course request",
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    msg: "Get all course request",
  });
});

module.exports = router;

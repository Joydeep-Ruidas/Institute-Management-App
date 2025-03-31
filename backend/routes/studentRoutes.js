const express = require("express");
const router = express.Router();

router.post("/add-student", (req, res) => {
  res.status(200).json({
    msg: "Add new student request",
  });
});

module.exports = router;

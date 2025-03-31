const express = require("express");
const router = express.Router();

router.post("/add-fee", (req, res) => {
  res.status(200).json({
    msg: "Add fee request",
  });
});

module.exports = router;

const express = require("express");
const { userSignup, userLogin } = require("../controllers/userControllers");
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

module.exports = router;

const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const {
  addFee,
  paymentsHistory,
  allPaymentsDetails,
} = require("../controllers/feeControllers");

router.post("/add-fee", checkAuth, addFee);
router.get("/payments-history", checkAuth, paymentsHistory); // Get all fee collection data for a particular User
router.get("/all-payments", checkAuth, allPaymentsDetails); //Get all payments details for a particular student in a particular course

module.exports = router;

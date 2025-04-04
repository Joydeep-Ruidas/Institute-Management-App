const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const feeModel = require("../models/feeModel");
const mongoose = require("mongoose");

router.post("/add-fee", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;
    const { fullName, phone, amount, remark, courseID } = req.body;

    const newFee = new feeModel({
      _id: new mongoose.Types.ObjectId(),
      fullName,
      phone,
      amount,
      remark,
      courseID,
      uID,
    });

    const saveFee = await newFee.save();

    res.status(201).json({ saveFee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

// Get all fee collection data for a particular User
router.get("/payment-history", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;

    const paymentHistory = await feeModel.find({ uID });

    res.status(200).json({ paymentHistory });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: err.message,
    });
  }
});

//Get all payments details for a particular student in a particular course
router.get("/all-payments", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;
    const { courseID, phone } = req.query;

    const allPayments = await feeModel.find({ uID, courseID, phone });

    res.status(200).json({ allPayments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;

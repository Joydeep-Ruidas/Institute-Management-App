const feeModel = require("../models/feeModel");
const mongoose = require("mongoose");

const addFee = async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
};

// Get all fee collection data for a particular User
const paymentsHistory = async (req, res) => {
  try {
    const { uID } = req.user;

    const paymentsHistory = await feeModel.find({ uID });

    res.status(200).json({ paymentsHistory });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

//Get all payments details for a particular student in a particular course
const allPaymentsDetails = async (req, res) => {
  try {
    const { uID } = req.user;
    const { courseID, phone } = req.query;

    const allPayments = await feeModel.find({ uID, courseID, phone });

    res.status(200).json({ allPayments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addFee, paymentsHistory, allPaymentsDetails };

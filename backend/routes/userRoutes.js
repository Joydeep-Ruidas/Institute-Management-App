const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();
const user = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { image } = req.files;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered.." });
    }

    const { secure_url: imageURL, public_id: imageID } =
      await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Institute_Management_App",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      email,
      password: hashPassword,
      imageURL,
      imageID,
    });

    const saveUser = await newUser.save();

    res.status(201).json({ newUser: saveUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await user.findOne({ email });
    if (!users) {
      return res.status(404).json({ msg: "Email not registered" });
    }

    const {
      _id,
      firstName,
      lastName,
      imageURL,
      imageID,
      password: hashPassword,
    } = users;

    const isMatch = await bcrypt.compare(password, hashPassword);

    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign(
      { email, firstName, lastName, uID: _id },
      process.env.JWT_SIGN,
      { expiresIn: "10d" }
    );

    res
      .status(200)
      .json({ _id, firstName, lastName, email, imageURL, imageID, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;

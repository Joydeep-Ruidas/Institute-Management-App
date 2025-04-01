const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinaryConfig");
require("dotenv").config();
const user = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { image } = req.files;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered.." });
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

module.exports = router;

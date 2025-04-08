const cloudinary = require("../config/cloudinaryConfig");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, instituteName, phone, email, password } = req.body;
    const { image } = req.files;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(406).json({ msg: "Email already registered.." });
    }

    const { secure_url: imageURL, public_id: imageID } =
      await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Institute_Management_App",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      instituteName,
      phone,
      email,
      password: hashPassword,
      imageURL,
      imageID,
    });

    const saveUser = await newUser.save();

    res.status(201).json({ newUser: saveUser, msg:'Account created successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Check your credentials" });
    }

    const {
      _id,
      firstName,
      lastName,
      imageURL,
      imageID,
      password: hashPassword, // Took the user's password and named it hashPassword
    } = user;

    const isMatch = await bcrypt.compare(password, hashPassword);

    if (!isMatch) {
      return res.status(401).json({ msg: "Check your credentials" });
    }

    const token = jwt.sign(
      { email, firstName, lastName, uID: _id }, // Renaming _id and sending it as uID
      process.env.JWT_SIGN,
      { expiresIn: "10d" }
    );

    const userData = {
      _id,
      firstName,
      lastName,
      email,
      imageURL,
      imageID,
      token,
    };

    res.status(200).json({ userData, msg:'Login successfull' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { userSignup, userLogin };

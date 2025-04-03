const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const studentModel = require("../models/studentModel");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinaryConfig");

router.post("/add-student", checkAuth, async (req, res) => {
  try {
    const { image } = req.files;

    const { secure_url: imageURL, public_id: imageID } =
      await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Institute_Management_App",
      });

    const { fullName, phone, email, address, courseID } = req.body;
    const { uID } = req.user; // Assuming checkAuth attaches user info to req

    const newStudent = new studentModel({
      _id: new mongoose.Types.ObjectId(),
      fullName,
      phone,
      email,
      address,
      courseID,
      imageID,
      imageURL,
      uID,
    });

    const saveStudent = await newStudent.save();

    res.status(201).json({ saveStudent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all students for any particular User
router.get("/", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;

    const allStudents = await studentModel.find({ uID });

    res.status(200).json({ allStudents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all students for any particular Course
router.get("/:courseID", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;

    const allStudents = await studentModel.find({
      uID,
      courseID: req.params.courseID,
    });

    res.status(200).json({ allStudents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-student/:id", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;
    const { fullName, phone, email, address, courseID } = req.body;

    const matchStudent = await studentModel.findById(req.params.id);

    if (matchStudent.uID !== uID) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to update this student" });
    }

    if (req.files) {
      await cloudinary.uploader.destroy(matchStudent.imageID);

      const { image } = req.files;

      const { secure_url: imageURL, public_id: imageID } =
        await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "Institute_Management_App",
        });

      const updatedStudentData = {
      fullName,
      phone,
      email,
      address,
      courseID,
      imageID,
      imageURL,
      uID,
      };

      const updatedStudent = await studentModel.findByIdAndUpdate(
        req.params.id,
        updatedStudentData,
        { new: true }
      );

      res.status(200).json({ updatedStudent });
    } else {
      const updatedStudentData = {
        fullName,
        phone,
        email,
        address,
        courseID,
        imageID:matchStudent.imageID,
        imageURL:matchStudent.imageURL,
        uID,
      };

      const updatedStudent = await studentModel.findByIdAndUpdate(
        req.params.id,
        updatedStudentData,
        { new: true }
      );

      res.status(200).json({ updatedStudent });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-student/:id", checkAuth, async (req, res) => {
  try {
    const matchStudent = await studentModel.findById(req.params.id);
    const { uID } = req.user;

    if (matchStudent.uID === uID) {
      await studentModel.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(matchStudent.imageID);

      res.status(200).json({ msg: "Student deleted successfully" });
    } else {
      res
        .status(401)
        .json({ msg: "You are not authorized to delete this post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

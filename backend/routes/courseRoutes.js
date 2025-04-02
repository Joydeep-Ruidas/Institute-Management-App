const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const course = require("../models/courseModel");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinaryConfig");

router.post("/add-course", checkAuth, async (req, res) => {
  try {
    const { image } = req.files;

    const { secure_url: imageURL, public_id: imageID } =
      await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Institute_Management_App",
      });

    const { courseName, price, description, startingDate, endDate } = req.body;
    const { uID } = req.user; // Assuming checkAuth attaches user info to req

    const newCourse = new course({
      _id: new mongoose.Types.ObjectId(),
      courseName,
      price,
      description,
      startingDate,
      endDate,
      imageID,
      imageURL,
      uID,
    });

    const saveCourse = await newCourse.save();

    res.status(201).json({ newCourse: saveCourse });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all course for any particular User
router.get("/", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;

    const allCourses = await course.find({ uID });

    res.status(200).json({ allCourses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get one course details for any particular User
router.get("/course-details/:id", checkAuth, async (req, res) => {
  try {
    const courseDetails = await course.findById(req.params.id);

    res.status(200).json({ courseDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

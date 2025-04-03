const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const course = require("../models/courseModel");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinaryConfig");
const studentModel=require("../models/studentModel")

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


// Get latest 5 courses for any particular User
router.get("/latest-course", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;

    const courses = await course
      .find({ uID })
      .sort({ $natural: -1 })
      .limit(5);

    res.status(200).json({ courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
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

    const studentDetails = await studentModel.find({courseID:req.params.id})
    res.status(200).json({ courseDetails, studentDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-course/:id", checkAuth, async (req, res) => {
  try {
    const { uID } = req.user;
    const { courseName, price, description, startingDate, endDate } = req.body;

    const matchCourse = await course.findById(req.params.id);

    if (matchCourse.uID !== uID) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to update this course" });
    }

    if (req.files) {
      await cloudinary.uploader.destroy(matchCourse.imageID);

      const { image } = req.files;

      const { secure_url: imageURL, public_id: imageID } =
        await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "Institute_Management_App",
        });

      const updatedCourseData = {
        courseName,
        price,
        description,
        startingDate,
        endDate,
        imageID,
        imageURL,
        uID,
      };

      const updatedCourse = await course.findByIdAndUpdate(
        req.params.id,
        updatedCourseData,
        { new: true }
      );

      res.status(200).json({ updatedCourse });
    } else {
      const updatedCourseData = {
        courseName,
        price,
        description,
        startingDate,
        endDate,
        imageID: matchCourse.imageID,
        imageURL: matchCourse.imageURL,
        uID,
      };

      const updatedCourse = await course.findByIdAndUpdate(
        req.params.id,
        updatedCourseData,
        { new: true }
      );

      res.status(200).json({ updatedCourse });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-course/:id", checkAuth, async (req, res) => {
  try {
    const matchCourse = await course.findById(req.params.id);
    const { uID } = req.user;

    if (matchCourse.uID === uID) {
      await course.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(matchCourse.imageID);

      res.status(200).json({ msg: "Course deleted successfully" });
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

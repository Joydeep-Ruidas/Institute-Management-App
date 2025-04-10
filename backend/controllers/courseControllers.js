const courseModel = require("../models/courseModel");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinaryConfig");
const studentModel = require("../models/studentModel");

const addCourse = async (req, res) => {
  try {
    const { image } = req.files;

    const { secure_url: imageURL, public_id: imageID } =
      await cloudinary.uploader.upload(image.tempFilePath, {
        folder: "Institute_Management_App",
      });

    const { courseName, price, description, startingDate, endDate } = req.body;
    const { uID } = req.user;

    const newCourse = new courseModel({
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

    res.status(201).json({ saveCourse, msg:"New Course Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const allCourses = async (req, res) => {
  try {
    const { uID } = req.user;

    const allCourses = await courseModel.find({ uID }).sort({ $natural: -1 });

    res.status(200).json({ allCourses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all the student details in any one course and also course details for any particular User
const courseDetails = async (req, res) => {
  try {
    const courseDetails = await courseModel.findById(req.params.id);

    const studentDetails = await studentModel.find({ courseID: req.params.id });
    res.status(200).json({ courseDetails, studentDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Get latest 5 courses for any particular User
const latestCourses = async (req, res) => {
  try {
    const { uID } = req.user;

    const courses = await courseModel
      .find({ uID })
      .sort({ $natural: -1 })
      .limit(5);

    res.status(200).json({ courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { uID } = req.user;
    const { courseName, price, description, startingDate, endDate } = req.body;

    const matchCourse = await courseModel.findById(req.params.id);

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

      const updatedCourse = await courseModel.findByIdAndUpdate(
        req.params.id,
        updatedCourseData,
        { new: true }
      );

      res.status(202).json({ updatedCourse });
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

      const updatedCourse = await courseModel.findByIdAndUpdate(
        req.params.id,
        updatedCourseData,
        { new: true }
      );

      res.status(202).json({ updatedCourse });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const matchCourse = await courseModel.findById(req.params.id);
    const { uID } = req.user;

    if (matchCourse.uID !== uID) {
      res
        .status(401)
        .json({ msg: "You are not authorized to delete this post" });
    } else {
      await courseModel.findByIdAndDelete(req.params.id);
      await cloudinary.uploader.destroy(matchCourse.imageID);

      res.status(202).json({ msg: "Course deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addCourse,
  allCourses,
  latestCourses,
  courseDetails,
  updateCourse,
  deleteCourse
};

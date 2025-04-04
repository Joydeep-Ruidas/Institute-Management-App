const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { addStudent, allStudents, latestStudents, allStudentsByCourse, updateStudent, deleteStudent } = require("../controllers/studentControllers");

router.post("/add-student", checkAuth,addStudent);
router.get("/all-students", checkAuth, allStudents); // Get all students for any particular User
router.get("/latest-students", checkAuth, latestStudents); // Get latest 5 students for any particular User
router.get("/all-students/:courseID", checkAuth, allStudentsByCourse); // Get all students for any particular Course
router.put("/update-student/:id", checkAuth,updateStudent);
router.delete("/delete-student/:id", checkAuth,deleteStudent);

module.exports = router;

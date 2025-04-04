const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const {
  addCourse,
  allCourses,
  latestCourses,
  courseDetails,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseControllers");

router.post("/add-course", checkAuth, addCourse);
router.get("/all-courses", checkAuth, allCourses);
router.get("/course-details/:id", checkAuth, courseDetails); // Get all the student details in any one course and also course details for any particular User
router.get("/latest-courses", checkAuth, latestCourses); // Get latest 5 courses for any particular User
router.put("/update-course/:id", checkAuth, updateCourse);
router.delete("/delete-course/:id", checkAuth, deleteCourse);

module.exports = router;

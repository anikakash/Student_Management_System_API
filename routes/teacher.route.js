const express = require("express");
const router = express.Router();

// Inherit Studnet crud functions
const {
  getTeachers,
  getLoggedInTeacherInfo,
  updateLoggedInTeacherInfo
} = require("../controllers/teacher.controller.js");


// Inherit authenticator middleware for restrieced API end Point
const {
  ensureAuthenticated,
  ensureRole
} = require("../middlewares/authenticator.middleware.js");

// Get student info End Point
router.get("/teachers", getTeachers);

// // Get student info by teacher End Point
router.get("/my-profile",ensureAuthenticated, getLoggedInTeacherInfo);

router.patch("/update-myinfo", ensureAuthenticated, updateLoggedInTeacherInfo);

// // Get student By Id info End Point
// router.get("/student/:id", getStudent);

// // Add Studnet info End Point
// router.post("/create-student",ensureAuthenticated, addStudent);

// // Upadate Studnet info End Point
// router.patch("/update-student/:id",ensureAuthenticated, updateStudent);

// // Remove Studnet info End Point
// router.delete("/remove-student/:id",ensureAuthenticated, ensureRole('HeadTeacher'),deleteStudent);

module.exports = router;

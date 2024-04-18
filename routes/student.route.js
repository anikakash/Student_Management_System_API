const express = require("express");
const router = express.Router();

// Inherit Studnet crud functions
const {
  addStudent,
  getStudents,
  getStudentsByTeacher,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");


// Inherit authenticator middleware for restrieced API end Point
const {
  ensureAuthenticated,
  ensureRole
} = require("../middlewares/authenticator.middleware.js");

// Get student info End Point
router.get("/students", getStudents);

// Get student info by teacher End Point
router.get("/advising-students",ensureAuthenticated, getStudentsByTeacher);

// Get student By Id info End Point
router.get("/student/:id", getStudent);

// Add Studnet info End Point
router.post("/create-student",ensureAuthenticated, addStudent);

// Upadate Studnet info End Point
router.patch("/update-student/:id",ensureAuthenticated, updateStudent);

// Remove Studnet info End Point
router.delete("/remove-student/:id",ensureAuthenticated, ensureRole('HeadTeacher'),deleteStudent);

module.exports = router;

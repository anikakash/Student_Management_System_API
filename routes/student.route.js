const express = require("express");
const router = express.Router();

const {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");

const {
  ensureAuthenticated,
} = require("../middlewares/authenticator.middleware.js");

router.get("/students", getStudents);
router.get("/student/:id", getStudent);
router.post("/student", ensureAuthenticated, addStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  teacherRegistration,
  teacherLogin,
} = require("../controllers/teacher.controller.js");

const {
  teacherRegistrationValidate,
  teacherLoginValidate,
} = require("../middlewares/teacher.middleware.js");

router.post(
  "/teacher/register",
  teacherRegistrationValidate,
  teacherRegistration
);
router.post("/teacher/login", teacherLoginValidate, teacherLogin);

module.exports = router;

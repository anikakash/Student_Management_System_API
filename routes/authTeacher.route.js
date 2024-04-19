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

// Inherit authenticator middleware for restrieced API end Point
const {
  ensureAuthenticated,
  ensureRole
} = require("../middlewares/authenticator.middleware.js");

// Registation End Point.
router.post("/teacher/register",ensureAuthenticated,ensureRole('HeadTeacher'),teacherRegistrationValidate, teacherRegistration);

// Login End Point.
router.post("/teacher/login", teacherLoginValidate, teacherLogin);

module.exports = router;
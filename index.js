// index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const studentRoute = require("./routes/student.route.js");
const authRoute = require("./routes/authTeacher.route.js");
const teacherRoute = require("./routes/teacher.route.js");
const Teacher = require("./models/teacher.model.js"); // Adjust the path to your model file
const createDefaultSuperAdmin = require("./controllers/seedUser.controller.js");

const app = express();

// Middleware to receive JSON from user end
app.use(express.json());

// Routes
app.use("/api/info", studentRoute);
app.use("/api/teacher-info", teacherRoute);
app.use("/api/auth", authRoute);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    createDefaultSuperAdmin(); // Call the function to create default super admin
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.log("DB Connection failed!", err);
  });

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const studentRoute = require("./routes/student.route.js");
const authRoute = require("./routes/auth.route.js");
const app = express();
// middle ware for recive json from user end
app.use(express.json());

// routes
app.use("/api/info", studentRoute);
app.use("/api/auth", authRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect to database!");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch(() => {
    console.log("DB Connection faild!");
  });

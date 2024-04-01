const Teacher = require("../models/teacher.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const teacherRegistration = async (req, res) => {
  const teacherModel = new Teacher(req.body);
  teacherModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = await teacherModel.save();
    response.password = undefined; // we are not send password so erase it before send the response
    res.status(200).json({ Message: "Teacher Regi success.", data: response });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const teacherLogin = async (req, res) => {
  try {
    const teacherCredential = await Teacher.findOne({ email: req.body.email });

    if (!teacherCredential) {
      return res
        .status(401)
        .json({ Message: "No User Found. Register your self." });
    }

    const isPassEqual = await bcrypt.compare(
      req.body.password,
      teacherCredential.password
    );

    if (!isPassEqual) {
      return res.status(401).json({ message: "Auth faild, Invalid mail/pass" });
    }

    const tokenObject = {
      _id: teacherCredential._id,
      Name: teacherCredential.name,
      department: teacherCredential.department,
      email: teacherCredential.email,
    };

    const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
      expiresIn: "30m",
    });

    res.status(200).json({ jwtToken, tokenObject });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  teacherRegistration,
  teacherLogin,
};

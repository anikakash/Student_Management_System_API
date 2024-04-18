const Teacher = require("../models/teacher.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const teacherRegistration = async (req, res) => {
  const teacherModel = new Teacher(req.body);
  teacherModel.password = await bcrypt.hash(req.body.password, 10);
  try {
    const response = await teacherModel.save();
    response.password = undefined; // we are not send password so erase it before send the response
    res.status(200).json({ Message: "Teacher Regi success.", response });
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
      Role: teacherCredential.role,
      Department: teacherCredential.department,
      Email: teacherCredential.email,
    };

    const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
      expiresIn: "30m",
    });

    res.status(200).json({ jwtToken, tokenObject });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};


const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({}).select('-password');  // Excluding the password field
    if (teachers.length === 0) {
      return res.status(404).json({ Meassage: "Database is empty!" });
    }
    res
      .status(200)
      .json({ message: "Teacher data retrive successfully ", data: teachers });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const getLoggedInTeacherInfo = async(req, res)=>{
  try {
    const teacherId = req.user._id;
    const teacherInfo = await Teacher.findById(teacherId).select('-password');;
    if (!teacherInfo) {
      return res.status(404).json({ Meassage: "This studnet is not exist" });
    }
    res.status(200).json(teacherInfo);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
}

const updateLoggedInTeacherInfo = async (req, res) => {
  try {
    const teacherId = req.user._id; // Get the logged-in teacher's ID
    const existingTeacher  = await Teacher.findById(teacherId);

    if (!existingTeacher)
      return res.status(404).json("Message: You data is not found!");
    
      // Update teh teacher's information
    existingTeacher.set(req.body);

    // If the request contains a new password, hash it and update the teacher's password
    if (req.body.password) {
      existingTeacher.password = await bcrypt.hash(req.body.password, 10);
    }

    // Save the updated teacher information
    const updatedTeacher = await existingTeacher.save();

    // Exclude the password field from the response
    updatedTeacher.password = undefined;

    res.status(200).json({ Message: "Teacher information updated successfully", data: updatedTeacher });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  teacherRegistration,
  teacherLogin,
  getTeachers,
  getLoggedInTeacherInfo,
  updateLoggedInTeacherInfo,
};

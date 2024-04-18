const Student = require("../models/student.model.js");

const addStudent = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const teacherName = req.user.Name;
    // Add teacher's information to the student data
    const studentData = {
      ...req.body,
      teacherId, // Associate teacher's ID with the student
      teacherName, // Associate teacher's name with the student
    };

    const student = await Student.create(studentData);
    res.status(200).json({ message: "Student added successfully", student });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ Message: error.message });
  }
};

const getStudentsByTeacher = async (req, res) => {
  try {
    const teacherId = req.user._id;
    const students = await Student.find({teacherId});
    if (students.length === 0) {
      return res.status(404).json({ Meassage: "Database is empty!" });
    }
    res
      .status(200)
      .json({ message: "Student data retrive successfully ", data: students });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (students.length === 0) {
      return res.status(404).json({ Meassage: "Database is empty!" });
    }
    res
      .status(200)
      .json({ message: "Student data retrive successfully ", data: students });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const studentInfo = await Student.findById(id);
    if (!studentInfo) {
      return res.status(404).json({ Meassage: "This studnet is not exist" });
    }
    res.status(200).json(studentInfo);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

// Logged in teacher can updated specifc studnet info
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user._id; // Get the logged-in teacher's ID
    const studnetInfo = await Student.findOneAndUpdate({_id: id,teacherId }, req.body,{ new: true });

    if (!studnetInfo)
      return res.status(404).json("Message: No studnt exist on `${id}`");

    const updateStudnetInfo = await Student.findById(id);
    res.status(200).json(updateStudnetInfo);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ Meassage: "Student is not found!" });
    }
    res.status(200).json({ Message: "student remove successfully." });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

module.exports = {
  addStudent,
  getStudents,
  getStudentsByTeacher,
  getStudent,
  updateStudent,
  deleteStudent,
};

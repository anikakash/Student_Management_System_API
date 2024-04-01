const Student = require("../models/student.model.js");

const addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(200).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (!students) {
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

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const studnetInfo = await Student.findByIdAndUpdate(id, req.body);

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
  getStudent,
  updateStudent,
  deleteStudent,
};

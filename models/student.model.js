const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    cgpa: {
      type: Number,
      required: true,
      default: 0.0,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId, // Assuming the teacher ID is stored as ObjectId
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const student = mongoose.model("student", StudentSchema);

module.exports = student;

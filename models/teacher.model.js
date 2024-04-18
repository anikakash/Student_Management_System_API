const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role:{
      type: String,
      required: true,
      enum: ['HeadTeacher', 'Teacher'],
      default: 'Teacher',
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;

// seedUser.js
const bcrypt = require("bcrypt");
const Teacher = require("../models/teacher.model");

async function createDefaultSuperAdmin() {
  try {
    const headTeacherExists = await Teacher.findOne({ role: "HeadTeacher" });

    if (!headTeacherExists) {
      const hashedPassword = await bcrypt.hash("password1", 10); // Replace 'password1' with a strong password

      const headTeacher = new Teacher({
        name: "Anik Akash",
        role: "HeadTeacher",
        email: "t1@gmail.com", // Replace with the desired default email
        department: "Computer Science and Engineering", // Replace with the desired default department
        password: hashedPassword,
      });

      await headTeacher.save();
      console.log("Default HeadTeacher created successfully");
    } else {
      console.log("HeadTeacher already exists");
    }
  } catch (err) {
    console.error("Error creating default HeadTeacher:", err);
  }
}

module.exports = createDefaultSuperAdmin;

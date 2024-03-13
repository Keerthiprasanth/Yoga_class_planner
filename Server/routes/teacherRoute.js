const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/TeacherModel");

router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const existingTeacher = await Teacher.findOne({ email: req.body.email });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newTeacher = new Teacher({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      age: req.body.age,
      experience: req.body.experience,
    });

    await newTeacher.save();

    res.status(200).json({ message: "Teacher registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const Teacher = await Teacher.findOne({ email: req.body.email });
    if (!Teacher) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      Teacher.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ StudentId: Teacher._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/studentModel");
const authenticateToken = require("../Middleware/authRequest");

router.post("/register", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newStudent = new Student({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      birthDate: req.body.birthDate,
    });

    await newStudent.save();

    res.status(200).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (!existingStudent) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      existingStudent.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { StudentId: existingStudent._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.StudentId;
    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.StudentId;

    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      req.body.name ||
      req.body.email ||
      req.body.password ||
      req.body.birthDate
    ) {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      }
      if (req.body.birthDate) {
        user.birthDate = req.body.birthDate;
      }

      await user.save();

      res.status(200).json({ message: "User details updated successfully" });
    } else {
      res.status(400).json({ message: "No fields provided for updating" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete-profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.StudentId;

    const user = await Student.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Student.findByIdAndDelete(userId);

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

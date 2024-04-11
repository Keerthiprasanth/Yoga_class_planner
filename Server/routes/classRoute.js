const express = require("express");
const router = express.Router();

const Class = require("../models/classModel");
const Teacher = require("../models/teacherModel");
const Student = require("../models/studentModel");
const authenticateToken = require("../Middleware/authRequest");


router.post("/create-class", authenticateToken, async (req, res) => {
  try {
    const teacherId = req.user.TeacherId;

    const { className, description, date, time, duration, maxCapacity } =
      req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const existingClass = await Class.findOne({
      teacher: teacherId,
      date,
      time,
    });

    if (existingClass) {
      return res
        .status(400)
        .json({
          message: "Teacher already has a class scheduled at the same time",
        });
    }

    const newClass = new Class({
      className,
      description,
      date,
      time,
      duration,
      maxCapacity,
      teacher: teacherId,
    });

    await newClass.save();

    res
      .status(200)
      .json({ message: "Class created successfully", class: newClass });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/join-class/:classId", authenticateToken, async (req, res) => {
  try {
    const { classId } = req.params;
    const studentId = req.user.StudentId;
    console.log("Student class join : ", studentId);

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classToJoin = await Class.findById(classId);
    if (!classToJoin) {
      return res.status(404).json({ message: "Class not found" });
    }

    if (classToJoin.students.length >= classToJoin.maxCapacity) {
      return res.status(400).json({ message: "Class is already full" });
    }

    if (classToJoin.students.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student is already enrolled in the class" });
    }

    classToJoin.students.push(studentId);
    await classToJoin.save();

    res.status(200).json({ message: "Student joined the class successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/get-classes", async (req, res) => {
  try {
    const sessions = await Class.find()
      .populate("teacher")
      .populate("students")
      .sort({ date: 1, time: 1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch session details." });
  }
});

module.exports = router;

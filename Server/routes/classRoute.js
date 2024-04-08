const express = require("express");
const router = express.Router();
const Class = require("../models/classModel");


router.post("/class", async (req, res) => {
  try {
    const classData = req.body;
    const newClass = await Class.create(classData);
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create class." });
  }
});

router.get("/get-classes", async (req, res) => {
  try {
    const sessions = await Class.find().sort({ date: 1, time: 1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch session details." });
  }
});

module.exports = router;

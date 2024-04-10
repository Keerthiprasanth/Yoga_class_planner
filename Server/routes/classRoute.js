const express = require("express");
const router = express.Router();
const Class = require("../models/classModel");


const jwt = require('jsonwebtoken');

router.post("/class", async (req, res) => {
  try {
    const classData = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    classData.user = userId;
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

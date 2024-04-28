const express = require("express");
const router = express.Router();

const FormData = require("../models/formModel");
const authenticateToken = require("../Middleware/authRequest");

router.post("/submit-form", authenticateToken, async (req, res) => {
  try {
    const formData = req.body;
    const submittedBy = req.user.StudentId;

    const newFormData = new FormData({ ...formData, submittedBy });

    await newFormData.save();

    res.status(201).json({ message: "Form data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/view-forms", async (req, res) => {
  try {
    const formData = await FormData.find();

    res.status(200).json({ formData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

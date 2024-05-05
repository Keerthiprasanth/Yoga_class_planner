const express = require("express");
const router = express.Router();
const FormData = require("../models/formModel");
const Class = require('../models/classModel');
const Sequence = require('../models/sequenceModel');
const Teacher = require('../models/teacherModel');
const authenticateToken = require("../Middleware/authRequest");

router.post("/submit-form", authenticateToken, async (req, res) => {
  try {
    const formData = req.body;
    const submittedBy = req.user.StudentId;
    let existingFormData = await FormData.findOne({ submittedBy });
    if (existingFormData) {
      existingFormData.set(formData);
      await existingFormData.save();
      res.status(200).json({ message: "Form data updated successfully" });
    } else {
      const newFormData = new FormData({ ...formData, submittedBy });
      await newFormData.save();
      res.status(201).json({ message: "Form data submitted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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

// router.get('/student-forms', authenticateToken, async (req, res) => {
//   try {
//     const { studentId } = req.user.StudentId;

//     const forms = await FormData.find({ submittedBy: studentId });

//     res.status(200).json({ forms });
//   } catch (error) {
//     console.error('Error fetching student forms:', error.message);
//     res.status(400).json({ error: error.message });
//   }
// });

//Route to view forms submitted by students of a specific class
router.get('/class-forms/:classId', async (req, res) => {
  try {
    const { classId } = req.params;

    const classInfo = await Class.findById(classId);
    if (!classInfo) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const studentIds = classInfo.students.map(student => student.studentId);
    
    const forms = await FormData.find({ submittedBy: { $in: studentIds } });

    res.status(200).json({ forms });
  } catch (error) {
    console.error('Error fetching class forms:', error.message);
    res.status(400).json({ error: error.message });
  }
});

//Teacher suggesting sequence to student
router.post("/suggest-sequence/:submittedBy", authenticateToken, async (req, res) => {
  try {
    const { submittedBy } = req.params;
    const { sequenceIds } = req.body;
    const teacherId = req.user.TeacherId;

    const formData = await FormData.findOne({ submittedBy });
    if (!formData) {
      return res.status(404).json({ message: "Form not found" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const sequences = await Sequence.find({ _id: { $in: sequenceIds } });
    if (sequences.length !== sequenceIds.length) {
      return res.status(404).json({ message: "One or more sequences not found" });
    }

    formData.suggestedSequences.push(
      ...sequenceIds.map(sequenceId => ({ suggestedBy: teacherId, sequenceId }))
    );

    await formData.save();

    res.status(200).json({ message: "Sequences suggested successfully" });
  } catch (error) {
    console.error('Error suggesting sequences:', error.message);
    res.status(500).json({ error: error.message });
  }
});

//Route to display student forms and sequence suggestions
router.get('/student-forms', authenticateToken, async (req, res) => {
  try {
    const { studentId } = req.user.StudentId;

    const forms = await FormData.find({ submittedBy: studentId }).populate({
      path: 'suggestedSequences.sequenceId',
      populate: {
        path: 'suggestedSequences.suggestedBy',
        select: 'name', 
      }
    });

    res.status(200).json({ forms });
  } catch (error) {
    console.error('Error fetching student forms:', error.message);
    res.status(400).json({ error: error.message });
  }
});

//Remove sequence suggested by a specific teacher to a student
router.delete("/remove-sequence/:formId/:sequenceId", authenticateToken, async (req, res) => {
  try {
    const { formId, sequenceId } = req.params;
    const teacherId = req.user.TeacherId;

    const formData = await FormData.findById(formId);
    if (!formData) {
      return res.status(404).json({ message: "Form not found" });
    }

    const sequenceIndex = formData.suggestedSequences.findIndex(suggestion => 
      suggestion.sequenceId.toString() === sequenceId && 
      suggestion.suggestedBy.toString() === teacherId
    );
    if (sequenceIndex === -1) {
      return res.status(404).json({ message: "Sequence not found in the form or not suggested by the teacher" });
    }

    formData.suggestedSequences.splice(sequenceIndex, 1);

    await formData.save();

    res.status(200).json({ message: "Sequence removed from the form successfully" });
  } catch (error) {
    console.error('Error removing sequence from form:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

const Teacher = require("../models/teacherModel");
const Asana = require("../models/asanaModel");
const Sequence = require("../models/sequenceModel");
const authenticateToken = require("../Middleware/authRequest");

router.post("/add-sequence", authenticateToken, async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const userId = req.user.TeacherId;

    const user = await Teacher.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newSequence = new Sequence({
      name: req.body.name,
      description: req.body.description,
      benefits: req.body.benefits,
      addedByName: user.name,
      addedById: userId,
    });

    if (req.body.asanaIds && req.body.asanaIds.length > 0) {
      const asanas = await Asana.find({ _id: { $in: req.body.asanaIds } });

      const existingAsanaIds = new Set(
        asanas.map((asana) => asana._id.toString())
      );

      if (existingAsanaIds.size !== req.body.asanaIds.length) {
        return res.status(400).json({ message: "Asana does not exist" });
      }

      newSequence.asanas.push(...asanas.map((asana) => asana._id));
    }

    await newSequence.save();

    res.status(200).json({ message: "Sequence created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/view-sequences", async (req, res) => {
  try {
    const sequences = await Sequence.find().populate('asanas');

    res.render("sequences", { sequences: sequences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const sequenceId = req.params.id;

    let sequence = await Sequence.findById(sequenceId);

    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }

    if (req.body.name) {
      sequence.name = req.body.name;
    }
    if (req.body.description) {
      sequence.description = req.body.description;
    }
    if (req.body.benefits) {
      sequence.benefits = req.body.benefits;
    }

    if (req.body.asanaIds && req.body.asanaIds.length > 0) {
      const asanas = await Asana.find({ _id: { $in: req.body.asanaIds } });
        console.log(asanas);
      const existingAsanaIds = new Set(
        asanas.map((asana) => asana._id.toString())
      );

      if (existingAsanaIds.size !== req.body.asanaIds.length) {
        return res.status(400).json({ message: "Asana does not exist" });
      }

      sequence.asanas = asanas.map((asana) => asana._id);
    }

    sequence = await sequence.save();

    res
      .status(200)
      .json({ message: "Sequence updated successfully", sequence });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const sequenceId = req.params.id;

    const sequence = await Sequence.findById(sequenceId);
    if (!sequence) {
      return res.status(404).json({ message: "Sequence not found" });
    }

    if (sequence.addedById !== req.user.TeacherId) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await Sequence.findByIdAndDelete(sequenceId);

    res.status(200).json({ message: "Sequence deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

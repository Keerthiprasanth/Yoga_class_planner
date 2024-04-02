const express = require("express");
const router = express.Router();

const Teacher = require("../models/teacherModel");
const Asana = require("../models/asanaModel");
const authenticateToken = require("../Middleware/authRequest");

const multer = require("multer");
const fs = require("fs");

const uploadsDir = "uploads"; //directory existence check
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add-asana",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    console.log("Request Body:", req.body);
    try {
      const userId = req.user.TeacherId;

      const user = await Teacher.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const newAsana = new Asana({
        name: req.body.name,
        description: req.body.description,
        benefits: req.body.benefits,
        image: req.file.filename,
        asanaType: req.body.asanaType,
        addedByName: user.name,
        addedById: userId,
      });

      await newAsana.save();

      res.status(200).json({ message: "Asana added successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/view-asanas", async (req, res) => {
  try {
    const asanas = await Asana.find();

    res.status(200).json({ asanas });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put(
  "/update/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const asanaId = req.params.id;

      let asana = await Asana.findById(asanaId);

      if (!asana) {
        return res.status(404).json({ message: "Asana not found" });
      }

      if (req.body.name) {
        asana.name = req.body.name;
      }
      if (req.body.description) {
        asana.description = req.body.description;
      }
      if (req.body.benefits) {
        asana.benefits = req.body.benefits;
      }
      if (req.file) {
        asana.image = req.file.filename;
      }
      if (req.body.asanaType){
        asana.asanaType = req.body.asanaType;
      }

      asana = await asana.save();

      res.status(200).json({ message: "Asana updated successfully", asana });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const asanaId = req.params.id;

    const asana = await Asana.findById(asanaId);
    if (!asana) {
      return res.status(404).json({ message: "Asana not found" });
    }

    if (asana.addedById !== req.user.TeacherId) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await Asana.findByIdAndDelete(asanaId);

    res.status(200).json({ message: "Asana deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

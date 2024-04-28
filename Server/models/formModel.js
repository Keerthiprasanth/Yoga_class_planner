const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  submittedBy: {
    type: String,
    required: true,
  },
  generalHealth: {
    existingMedicalConditions: String,
    medications: String,
    surgeriesOrInjuries: String,
    allergies: String
  },
  physicalHealth: {
    chronicPain: String,
    sensitiveAreas: String,
    physicalLimitations: String
  },
  yogaExperience: {
    practicedBefore: String,
    yogaStyles: String,
    goals: String,
    avoidPoses: String
  }
}, { timestamps: true });

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;

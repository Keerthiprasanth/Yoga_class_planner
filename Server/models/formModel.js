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
  },
  suggestedSequences: [
    {
      suggestedBy: {
        type: String
      },
      sequenceId: {
        type: String
      },
      suggestedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
}, { timestamps: true });

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;

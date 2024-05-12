const mongoose = require("mongoose");

const sequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  asanas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asana'
  }],

});

const Sequence = mongoose.model("Sequence", sequenceSchema);

module.exports = Sequence;

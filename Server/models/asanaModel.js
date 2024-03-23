const mongoose = require("mongoose");

const asanaSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true,
  },
  sequence: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asana'
  }],
});

const Asana = mongoose.model("Asana", asanaSchema);

module.exports = Asana;

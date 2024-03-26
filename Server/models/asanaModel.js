const mongoose = require("mongoose");

const asanaSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    // required: true,
  },
  sequence: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asana'
  }],
  addedByName: {
    type: String,
    required: true,
  },
  addedById: {
    type: String,
    required: true,
  }
});

const Asana = mongoose.model("Asana", asanaSchema);

module.exports = Asana;

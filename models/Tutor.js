const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  numAbsence: {
    type: Number,
    default: 0
  },
  numHours: {
    type: Number,
    default: 0
  },
  year: {
    type: String,
    required: true
  },
  available: {
    type: String,
    required: true
  },
  subjects: [
    {
      topic: {
        type: String,
        required: true
      },
      grade: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Tutor = mongoose.model("tutor", tutorSchema);

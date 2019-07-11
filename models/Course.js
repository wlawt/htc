const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  course: {
    type: String,
    required: true
  }
});

module.exports = Course = mongoose.model("course", courseSchema);

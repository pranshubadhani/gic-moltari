const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true,
  },
  numberOfStudents: {
    type: Number,
    required: true,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;

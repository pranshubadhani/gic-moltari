const Enrollment = require("../models/enrollment");

const enrollmentController = {
  createEnrollment: async (req, res) => {
    try {
      const { year, numberOfStudents } = req.body;
      const newEnrollment = new Enrollment({ year, numberOfStudents });
      await newEnrollment.save();
      res.status(201).json(newEnrollment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllEnrollments: async (req, res) => {
    try {
      const enrollments = await Enrollment.find();
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateEnrollment: async (req, res) => {
    try {
      const { id } = req.params;
      const { year, numberOfStudents } = req.body;
      const enrollment = await Enrollment.findById(id);

      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      enrollment.year = year;
      enrollment.numberOfStudents = numberOfStudents;
      await enrollment.save();
      res.status(200).json(enrollment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteEnrollment: async (req, res) => {
    try {
      const { id } = req.params;
      const enrollment = await Enrollment.findById(id);

      if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      await enrollment.remove();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = enrollmentController;

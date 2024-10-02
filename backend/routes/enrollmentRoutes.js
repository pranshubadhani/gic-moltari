const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes for managing enrollment
router.post("/", authMiddleware, enrollmentController.createEnrollment);
router.get("/", enrollmentController.getAllEnrollments);
router.put("/:id", authMiddleware, enrollmentController.updateEnrollment);
router.delete("/:id", authMiddleware, enrollmentController.deleteEnrollment);

module.exports = router;

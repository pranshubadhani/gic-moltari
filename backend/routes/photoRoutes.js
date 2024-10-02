const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const photoController = require("../controllers/photoController");
const authMiddleware = require("../middlewares/authMiddleware");


// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/photos"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });


router.post(
  "/upload",
  authMiddleware,
  upload.single("photo"),
  photoController.uploadPhoto
);
router.get("/fetch", photoController.getPhotos);


router.delete("/delete/:id", authMiddleware, photoController.deletePhoto);


module.exports = router;

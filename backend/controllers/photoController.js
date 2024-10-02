const path = require("path");
const fs = require("fs");
const Photo = require("../models/Photo");

const photoController = {
  uploadPhoto: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const photoUrl = `/uploads/photos/${req.file.filename}`;

      const newPhoto = new Photo({ url: photoUrl });
      await newPhoto.save();

      res
        .status(201)
        .json({ message: "Photo uploaded successfully", photoUrl });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  getPhotos: async (req, res) => {
    try {
      const photos = await Photo.find();
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },

  deletePhoto: async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }

      await photo.deleteOne();

      const photoPath = path.join(
        __dirname,
        "../uploads/photos",
        path.basename(photo.url)
      );


      fs.unlink(photoPath, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to delete photo file", error: err });
        }
      });

      res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};

module.exports = photoController;

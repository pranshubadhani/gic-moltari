const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

// Routes
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const photoRoutes = require("./routes/photoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;


mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));



app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/photo", photoRoutes);

app.use("/uploads/photos", express.static(path.join(__dirname, "uploads/photos")));

// Start server

app.get('/', (req,res)=>{
  res.send("Server is active...");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

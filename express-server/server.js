const express = require("express");
const multer = require("multer");
const path = require("path");

const cors = require("cors");

const app = express(); // Initialize the app
app.use(cors()); // Use the CORS middleware

const upload = multer({ dest: "uploads/" });

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route handler for file upload
app.post("/uploads", upload.single("file"), (req, res) => {
  // Access the uploaded file using req.file
  // Perform necessary processing or save the file to a location

  // Send a response indicating the file upload was successful
  res.json({ message: "File uploaded successfully" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

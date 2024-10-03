const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("../Middleware/ImageStorageMiddleware.js");
const { GridFSBucket } = require("mongodb");

// User Image Upload Endpoint
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res
    .status(200)
    .json({
      message: "File uploaded successfully",
      imageUrl: `http://localhost:5010/image/${req.file.filename}`,
    });
});

// Get Profile Pic Endpoint
router.get("/:filename", async (req, res) => {
  try {
    // Ensure the connection is established before using GridFSBucket
    const db = mongoose.connection.db;

    // Initialize GridFSBucket
    const bucket = new GridFSBucket(db, {
      bucketName: "photos", // Your GridFS collection name
    });

    // Find the file in the GridFS collection by filename
    const files = await db
      .collection("photos.files")
      .findOne({ filename: req.params.filename });

    if (!files) {
      return res.status(404).json({ message: "File not found" });
    }

    // Create a readable stream from the GridFSBucket
    const readStream = bucket.openDownloadStreamByName(req.params.filename);

    // Pipe the readable stream to the response
    readStream.pipe(res);

    // Handle errors on the stream
    readStream.on("error", (err) => {
      console.log(err);
      res.status(500).send("An error occurred while streaming the image.");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the image");
  }
});

module.exports = router;

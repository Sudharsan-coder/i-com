const router = require("express").Router();
const mongoose = require("mongoose");
const upload = require("../middleware/imageStorageMiddleware.js");
const { GridFSBucket } = require("mongodb");

// User Image Upload Endpoint
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).json({
    message: "File uploaded successfully",
    imageUrl: `https://icom-okob.onrender.com/image/${req.file.filename}`,
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

router.delete("/delete/:filename", async (req, res) => {
  try {
    const db = mongoose.connection.db;

    // Initialize GridFSBucket
    const bucket = new GridFSBucket(db, {
      bucketName: "photos",  // Custom bucket name for storing files
    });

    // Find the file by filename in photos.files collection
    const file = await db.collection("photos.files").findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete the file using the _id of the file
    await bucket.delete(file._id); // Use GridFSBucket.delete() to remove both files and chunks
    console.log(`File with filename ${req.params.filename} deleted successfully.`);

    return res.status(200).json({ message: `File ${req.params.filename} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("An error occurred while deleting the image");
  }
});


module.exports = router;

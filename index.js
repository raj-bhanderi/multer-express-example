const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle file upload
app.post("/upload", upload.single("video"), (req, res) => {
  const filePath = req.file.path;
  const imageUrl = `http://localhost:${port}/uploads/${path.basename(
    filePath
  )}`;
  res.send(
    `File uploaded! File path: ${filePath} <img src="${imageUrl}" alt="Uploaded Image"></img>`
  );
});

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

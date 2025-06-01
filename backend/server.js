require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS so frontend (running on a different container or port) can communicate
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dropit_files',
    allowed_formats: ['jpg', 'png', 'pdf', 'docx', 'txt', 'mp4', 'mp3', 'zip', 'rar', 'mov'],
  },
});

const upload = multer({ storage: storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({
    message: 'File uploaded successfully!',
    fileUrl: req.file.path,
    fileName: req.file.originalname,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

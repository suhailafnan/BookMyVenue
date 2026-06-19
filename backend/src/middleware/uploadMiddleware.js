// Import multer package
const multer = require("multer");
const path = require("path");

// Configure storage settings
const storage = multer.diskStorage({

  // Folder where images are saved
  destination: function (req, file, cb) {

    cb(null, "uploads/");
  },

  // Rename uploaded file
  filename: function (req, file, cb) {

    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "-");
    cb(null, Date.now() + "-" + safeName);
  },
});

// Create upload middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const extname = allowedExtensions.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }

    cb(new Error("Only jpeg, jpg, png, and webp images are allowed"));
  },
});

// Export upload middleware
module.exports = upload;

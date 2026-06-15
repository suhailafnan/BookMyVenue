// Import multer package
const multer = require("multer");

// Configure storage settings
const storage = multer.diskStorage({

  // Folder where images are saved
  destination: function (req, file, cb) {

    cb(null, "uploads/");
  },

  // Rename uploaded file
  filename: function (req, file, cb) {

    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create upload middleware
const upload = multer({
  storage: storage,
});

// Export upload middleware
module.exports = upload;
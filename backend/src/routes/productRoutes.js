// Import Express
const express = require("express");

// Create Router object
const router = express.Router();

// Import upload middleware
const upload = require("../middleware/uploadMiddleware");

// Import controller functions
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");


// =====================================
// GET ALL PRODUCTS
// URL: GET /api/products
// =====================================
router.get("/", getProducts);


// =====================================
// CREATE PRODUCT
// URL: POST /api/products
// =====================================
router.post("/", createProduct);


// =====================================
// UPLOAD PRODUCT IMAGE
// URL: POST /api/products/upload
// =====================================
router.post(
  "/upload",
  upload.single("image"),
  (req, res) => {

    // Debug Information
    console.log("HEADERS =", req.headers);
    console.log("FILE =", req.file);
    console.log("BODY =", req.body);

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Success Response
    res.status(200).json({
      message: "Image uploaded successfully",
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });

  }
);


// =====================================
// GET PRODUCT BY ID
// URL: GET /api/products/:id
// =====================================
router.get("/:id", getProductById);


// =====================================
// UPDATE PRODUCT
// URL: PUT /api/products/:id
// =====================================
router.put("/:id", updateProduct);


// =====================================
// DELETE PRODUCT
// URL: DELETE /api/products/:id
// =====================================
router.delete("/:id", deleteProduct);


// Export router
module.exports = router;
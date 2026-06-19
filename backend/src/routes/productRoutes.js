// Import Express
const express = require("express");

// Create Router object
const router = express.Router();

// Import upload middleware
const upload = require("../middleware/uploadMiddleware");
const {
  requireFields,
  validateObjectId,
  validateProductPayload,
  validateStockPayload,
} = require("../middleware/validateMiddleware");

// Import controller functions
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getInventoryDashboard,
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
router.post(
  "/",
  upload.single("image"),
  requireFields(["name", "description", "price", "category"]),
  validateProductPayload,
  createProduct
);

router.get("/inventory/dashboard", getInventoryDashboard);


// =====================================
// UPLOAD PRODUCT IMAGE
// URL: POST /api/products/upload
// =====================================
router.post(
  "/upload",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.success({
      message: "Image uploaded successfully",
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
      },
    });
  }
);


// =====================================
// GET PRODUCT BY ID
// URL: GET /api/products/:id
// =====================================
router.get("/:id", validateObjectId(), getProductById);


// =====================================
// UPDATE PRODUCT
// URL: PUT /api/products/:id
// =====================================
router.put(
  "/:id",
  validateObjectId(),
  upload.single("image"),
  validateProductPayload,
  updateProduct
);


// =====================================
// UPDATE STOCK
// URL: PUT /api/products/:id/stock
// =====================================
router.put("/:id/stock", validateObjectId(), validateStockPayload, updateStock);


// =====================================
// DELETE PRODUCT
// URL: DELETE /api/products/:id
// =====================================
router.delete("/:id", validateObjectId(), deleteProduct);


// Export router
module.exports = router;

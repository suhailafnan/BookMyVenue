// Import Express
const express = require("express");

// Create Router object
const router = express.Router();

// Import controller function
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// GET /api/products
// When user visits /api/products
// Run getProducts() function
router.get("/", getProducts);

// POST /api/products
// Create new product
router.post("/", createProduct);

// =====================================
// GET PRODUCT BY ID
// URL: GET /api/products/:id
// =====================================
router.get("/:id", getProductById);

// PUT /api/products/:id
router.put("/:id", updateProduct);

// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

// Export router
module.exports = router;
// Import Express
const express = require("express");

// Create Router object
const router = express.Router();

// Import controller function
const {
  getProducts,
  createProduct,
  getProductById,
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


// Export router
module.exports = router;
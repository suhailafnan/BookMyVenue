// Import Express
const express = require("express");

// Create Router
const router = express.Router();

// Import Category Controller Functions
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");


// =====================================
// GET ALL CATEGORIES
// URL: GET /api/categories
// =====================================
router.get("/", getCategories);


// =====================================
// CREATE CATEGORY
// URL: POST /api/categories
// =====================================
router.post("/", createCategory);


// =====================================
// GET CATEGORY BY ID
// URL: GET /api/categories/:id
// =====================================
router.get("/:id", getCategoryById);


// =====================================
// UPDATE CATEGORY
// URL: PUT /api/categories/:id
// =====================================
router.put("/:id", updateCategory);


// =====================================
// DELETE CATEGORY
// URL: DELETE /api/categories/:id
// =====================================
router.delete("/:id", deleteCategory);


// Export Router
module.exports = router;
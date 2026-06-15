// Import Category Model
const Category = require("../models/Category");


// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {

    // Get all categories from MongoDB
    const categories = await Category.find();

    res.status(200).json(categories);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {

    // Save category into MongoDB
    const category = await Category.create(req.body);

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET CATEGORY BY ID
// URL: GET /api/categories/:id
// =====================================
const getCategoryById = async (req, res) => {
  try {

    // Get category ID from URL
    const categoryId = req.params.id;

    // Find category in MongoDB
    const category = await Category.findById(categoryId);

    // Check category exists
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Return category
    res.status(200).json(category);

  } catch (error) {

    // Error handling
    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// UPDATE CATEGORY
// URL: PUT /api/categories/:id
// =====================================
const updateCategory = async (req, res) => {
  try {

    // Update category
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Check category exists
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Return updated category
    res.status(200).json(category);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// DELETE CATEGORY
// URL: DELETE /api/categories/:id
// =====================================
const deleteCategory = async (req, res) => {
  try {

    // Delete category
    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    // Check category exists
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Success response
    res.status(200).json({
      message: "Category deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Export Functions
module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
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


// Export Functions
module.exports = {
  getCategories,
  createCategory,
};
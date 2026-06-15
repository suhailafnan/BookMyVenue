// Import Product Model
// This gives access to products collection in MongoDB
const Product = require("../models/Product");


// =====================================
// GET ALL PRODUCTS
// URL: GET /api/products
// =====================================
const getProducts = async (req, res) => {
  try {

    // Get all products
    // Also fetch category details
    const products = await Product.find()
      .populate("category");

    // Send products as JSON response
    res.status(200).json(products);

  } catch (error) {

    // If error occurs, send error message
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// CREATE PRODUCT
// URL: POST /api/products
// =====================================
const createProduct = async (req, res) => {
  try {

    // Create new product using request body
    const product = await Product.create(req.body);

    // Return newly created product
    res.status(201).json(product);

  } catch (error) {

    // If error occurs, send error message
    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// GET PRODUCT BY ID
// URL: GET /api/products/:id
// =====================================
const getProductById = async (req, res) => {
  try {

    // Get ID from URL
    const productId = req.params.id;

    // Find product and populate category
    const product = await Product.findById(productId)
      .populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// UPDATE PRODUCT
// URL: PUT /api/products/:id
// =====================================
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================================
// DELETE PRODUCT
// URL: DELETE /api/products/:id
// =====================================
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// Export functions
module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
// Import Product Model
// This gives access to the products collection in MongoDB
const Product = require("../models/Product");


// =====================================
// GET ALL PRODUCTS
// URL: GET /api/products
// =====================================
const getProducts = async (req, res) => {
  try {

    // Fetch all products from MongoDB
    const products = await Product.find();

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
// CREATE NEW PRODUCT
// URL: POST /api/products
// =====================================
const createProduct = async (req, res) => {
  try {

    // req.body contains data sent by user
    // Save product into MongoDB
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


// Export functions
// So routes can use them
module.exports = {
  getProducts,
  createProduct,
};
// Import Product Model
// This gives access to products collection in MongoDB
const Product = require("../models/Product");

// =====================================
// GET ALL PRODUCTS + SEARCH + FILTER
// URL: GET /api/products
// URL: GET /api/products?keyword=hall
// URL: GET /api/products?category=id
// URL: GET /api/products?minPrice=1000
// URL: GET /api/products?maxPrice=5000
// =====================================
const getProducts = async (req, res) => {
  try {

    const keyword = req.query.keyword;
    const category = req.query.category;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    let searchFilter = {};

    // Search by product name
    if (keyword) {
      searchFilter.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      searchFilter.category = category;
    }

    // Filter by minimum price
    if (minPrice) {
      searchFilter.price = {
        ...searchFilter.price,
        $gte: Number(minPrice),
      };
    }

    // Filter by maximum price
    if (maxPrice) {
      searchFilter.price = {
        ...searchFilter.price,
        $lte: Number(maxPrice),
      };
    }

    const products = await Product.find(searchFilter)
      .populate("category");

    res.status(200).json(products);

  } catch (error) {

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

// =====================================
// UPDATE STOCK
// URL: PUT /api/products/:id/stock
// =====================================
const updateStock = async (req, res) => {
  try {

    const { stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.stock = stock;

    await product.save();

    res.status(200).json({
      message: "Stock updated successfully",
      product,
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
  updateStock,
};
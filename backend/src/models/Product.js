// Import Mongoose
const mongoose = require("mongoose");

// Create Product Schema
const productSchema = new mongoose.Schema(
  {
    // Product Name
    name: {
      type: String,
      required: true,
    },

    // Product Description
    description: {
      type: String,
    },

    // Product Price
    price: {
      type: Number,
      required: true,
    },

    // Category Reference
    // Stores Category ID from MongoDB
    category: {
      // MongoDB Object ID
      type: mongoose.Schema.Types.ObjectId,

      // Connects to Category Model
      ref: "Category",

      required: true,
    },

    // Available Stock
    stock: {
      type: Number,
      default: 0,
    },

    // Product Image Name
    image: {
      type: String,
    },
  },
  {
    // Automatically creates:
    // createdAt
    // updatedAt
    timestamps: true,
  }
);

// Export Product Model
module.exports = mongoose.model("Product", productSchema);
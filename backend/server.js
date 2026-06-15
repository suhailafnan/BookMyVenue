// Import Express framework
const express = require("express");

// Import CORS package
const cors = require("cors");

// Import dotenv for .env variables
const dotenv = require("dotenv");

// Import MongoDB connection function
const connectDB = require("./src/config/db");

// Import Product Routes
const productRoutes = require("./src/routes/productRoutes");

const categoryRoutes = require("./src/routes/categoryRoutes");

// Load .env file
dotenv.config();

// Connect MongoDB Atlas
connectDB();

// Create Express app
const app = express();

// Allow frontend requests
app.use(cors());

// Accept JSON data
app.use(express.json());

// Product API Routes
// All requests starting with /api/products
// will go to productRoutes.js
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("BookMyVenue Backend Running");
});

app.use("/api/categories", categoryRoutes);

// Port Number
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
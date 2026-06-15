// Import Express framework
const express = require("express");

// Import CORS package
const cors = require("cors");

// Import dotenv for .env variables
const dotenv = require("dotenv");

// Import path module
// Used for folder/file paths
const path = require("path");

// Import MongoDB connection function
const connectDB = require("./src/config/db");

// Import Product Routes
const productRoutes = require("./src/routes/productRoutes");

// Import Category Routes
const categoryRoutes = require("./src/routes/categoryRoutes");

// Load .env file
dotenv.config();

// Connect MongoDB Atlas
connectDB();

// Create Express app
const app = express();


// =====================================
// MIDDLEWARES
// =====================================

// Allow frontend requests
app.use(cors());

// Accept JSON data
app.use(express.json());


// =====================================
// STATIC FILES
// =====================================

// Serve uploaded images from uploads folder
//
// Example:
// uploads/1781556576433-hero.jpg
//
// Browser URL:
// http://localhost:5000/uploads/1781556576433-hero.jpg
//
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// =====================================
// ROUTES
// =====================================

// Product API Routes
app.use("/api/products", productRoutes);

// Category API Routes
app.use("/api/categories", categoryRoutes);


// =====================================
// TEST ROUTE
// =====================================

app.get("/", (req, res) => {
  res.send("BookMyVenue Backend Running");
});


// =====================================
// SERVER
// =====================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
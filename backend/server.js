// Import Express framework
const express = require("express");

// Import CORS package
const cors = require("cors");

// Import path module
// Used for folder/file paths
const path = require("path");

const env = require("./src/config/env");

// Import MongoDB connection function
const connectDB = require("./src/config/db");

// Import Product Routes
const productRoutes = require("./src/routes/productRoutes");

// Import Category Routes
const categoryRoutes = require("./src/routes/categoryRoutes");
const { errorHandler, notFound } = require("./src/middleware/errorMiddleware");
const responseFormatter = require("./src/utils/responseFormatter");

// Connect MongoDB Atlas
connectDB();

// Create Express app
const app = express();


// =====================================
// MIDDLEWARES
// =====================================

// Allow frontend requests
app.use(
  cors({
    origin: env.clientUrl,
  })
);

// Accept JSON data
app.use(express.json());
app.use(responseFormatter);


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
  res.json({
    name: "BookMyVenue API",
    status: "running",
    endpoints: ["/api/categories", "/api/products", "/uploads"],
  });
});

app.use(notFound);
app.use(errorHandler);


// =====================================
// SERVER
// =====================================

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

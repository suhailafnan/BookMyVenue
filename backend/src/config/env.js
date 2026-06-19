const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  lowStockThreshold: Number(process.env.LOW_STOCK_THRESHOLD || 10),
  jwtSecret: process.env.JWT_SECRET || "replace-this-secret-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

module.exports = env;

import dotenv from "dotenv";
import path from "path";

// 1. Initial configuration: Load environment variables as early as possible
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

// 2. Database Connection Initiator
connectDB();

// 3. Keep-alive Express Server listening
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 BookMyVenue Server bootstrapped successfully!`);
  console.log(`🌌 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Port Access: http://localhost:${PORT}`);
  console.log(`===============================================`);
});

// 4. Handle unhandled exceptions/rejections gracefully
process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION! Shutting down gracefully...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err: any) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down gracefully...");
  console.error(err.name, err.message);
  process.exit(1);
});

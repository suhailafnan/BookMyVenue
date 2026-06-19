import mongoose from "mongoose";

/**
 * Establishment of connection to MongoDB Atlas or local deployment.
 * Handles initial connection and active connection listeners/lifecycle.
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error("Error: MONGODB_URI is not defined in environment variables.");
      process.exit(1);
    }

    mongoose.connection.on("connecting", () => {
      console.log("Connecting to MongoDB Database...");
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB is successfully connected.");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB is disconnected.");
    });

    await mongoose.connect(mongoURI);
  } catch (error: any) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

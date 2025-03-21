import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://myadmin:mysecret@localhost:27017/myappdb?authSource=myappdb";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,        // Limit connections in pool to 50
      minPoolSize: 1,         // Keep at least 5 connections open
      maxIdleTimeMS: 30000,   // Close idle connections after 30 seconds
      socketTimeoutMS: 45000, // Timeout for I/O operations (default: 30s)
      serverSelectionTimeoutMS: 5000, // Timeout for selecting a server
    })
    const db = mongoose.connection;
    db.on("connected", () => console.log("✅ MongoDB connected!"));
    db.on("error", (err) => console.error("❌ MongoDB connection error:", err));
    db.on("disconnected", () => console.log("⚠️ MongoDB disconnected!"));
    return true;
  }catch (error) {
    console.error(error);
    process.exit(1);
    return false;
  }
}

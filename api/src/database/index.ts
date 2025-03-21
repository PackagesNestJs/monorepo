// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();
//
// const MONGO_URI = process.env.MONGO_URI || "mongodb://myadmin:mysecret@localhost:27017/myappdb?authSource=myappdb";
//
// export const connectDB = async () => {
//   try {
//     // Create a reference to the existing connection
//     const db = mongoose.connection;
//     // Register event listeners BEFORE calling connect
//     if (process.env.NODE_ENV !== "production") {
//       console.log("⚠️ Project running in development!");
//       db.once("open", async () => console.info("🔌 Connecting to MongoDB..."));
//       db.on("reconnected", async() => console.log("✅ MongoDB reconnected!"));
//       db.on("reconnectFailed", async() => console.log("❌ MongoDB reconnect failed!"));
//       db.on("close", async() => console.log("⚠️ MongoDB connection closed!"));
//       db.set("debug", true)
//       db.set("debug",{color: true});
//     }else {
//       console.log("✅ Project running in production!");
//     }
//     // Now establish the connection
//     await mongoose.connect(MONGO_URI, {
//       maxPoolSize: 10,        // Limit connections in pool to 50
//       minPoolSize: 1,         // Keep at least 5 connections open
//       maxIdleTimeMS: 30000,   // Close idle connections after 30 seconds
//       socketTimeoutMS: 45000, // Timeout for I/O operations (default: 30s)
//       serverSelectionTimeoutMS: 5000, // Timeout for selecting a server
//     })
//     return true;
//   }catch (error) {
//     console.error(error);
//     process.exit(1);
//     return false;
//   }
// }

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://myadmin:mysecret@localhost:27017/myappdb?authSource=myappdb';


class Database {
  static instance: Database;
  private db: unknown;

  constructor() {
    if (!Database.instance) {
      this.connect();
      Database.instance = this;
    }
    return Database.instance;
  }

  async connect() {
    try {
      if (!this.db) {
        const connection = mongoose.connection;
        // Register event listeners BEFORE calling connect
        if (process.env.NODE_ENV !== 'production') {
          console.log('⚠️ Project running in development!');
          connection.once('open', async () => console.info('🔌 Connecting to MongoDB...'));
          connection.on('reconnected', async () => console.log('✅ MongoDB reconnected!'));
          connection.on('reconnectFailed', async () => console.log('❌ MongoDB reconnect failed!'));
          connection.on('close', async () => console.log('⚠️ MongoDB connection closed!'));
          connection.set('debug', true);
          connection.set('debug', { color: true });
        } else {
          console.log('✅ Project running in production!');
        }
        // Now establish the connection
        await mongoose.connect(MONGO_URI, {
          maxPoolSize: 10,        // Limit connections in pool to 50
          minPoolSize: 1,         // Keep at least 5 connections open
          maxIdleTimeMS: 30000,   // Close idle connections after 30 seconds
          socketTimeoutMS: 45000, // Timeout for I/O operations (default: 30s)
          serverSelectionTimeoutMS: 5000 // Timeout for selecting a server
        });
        console.log(connection)
        this.db = connection;
      }
    }catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  async getConnection() {
    return this.db;
  }

}

export default new Database();
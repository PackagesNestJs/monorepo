import mongoose from 'mongoose';
import dotenv from 'dotenv';
import configDB from '../configs/mongodb';

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  `mongodb://${configDB.database.user}:${configDB.database.password}@${configDB.database.host}:${configDB.database.port}/${configDB.database.database}?authSource=${configDB.database.authSource}`;

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

  connect() {
    try {
      if (!this.db) {
        const connection = mongoose.connection;
        // Register event listeners BEFORE calling connect
        if (process.env.NODE_ENV !== 'production') {
          console.log('⚠️ Project running in development!');
          connection.once('open', async () =>
            console.info('🔌 Connecting to MongoDB...'),
          );
          connection.on('reconnected', async () =>
            console.log('✅ MongoDB reconnected!'),
          );
          connection.on('reconnectFailed', async () =>
            console.log('❌ MongoDB reconnect failed!'),
          );
          connection.on('close', async () =>
            console.log('⚠️ MongoDB connection closed!'),
          );
          connection.set('debug', true);
          connection.set('debug', { color: true });
        } else {
          console.log('✅ Project running in production!');
        }
        // Now establish the connection
        mongoose.connect(MONGO_URI, {
          maxPoolSize: 10, // Limit connections in pool to 50
          minPoolSize: 1, // Keep at least 5 connections open
          maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
          socketTimeoutMS: 45000, // Timeout for I/O operations (default: 30s)
          serverSelectionTimeoutMS: 5000, // Timeout for selecting a server
        });
        this.db = connection;
      }
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  async getConnection() {
    return this.db;
  }

  async getConnectionCount() {
    const connections = mongoose.connections.length;
    console.log(`🔌 Connected to MongoDB: ${connections} connections`);
    return connections;
  }
}

export default new Database();

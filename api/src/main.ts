/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import databaseInstance from './database/mongodb';
import { startMonitoring } from './helpers/check.connections';
import configDB from './configs/mongodb';

const app = express();
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = configDB.app.port;

const startServer = async () => {
  const isConnected: unknown = await databaseInstance.getConnection();
  if (isConnected) {
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Closing server...');
        process.exit(0);
      });
    });
    server.on('error', console.error);
    await databaseInstance.getConnectionCount();
    await startMonitoring(isConnected);
  }
}

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/api', (req, res) => {
  const strCompression= 'Welcome to the API';
  return res.status(200).json({
    message: 'Welcome to the API',
    metadata: strCompression.repeat(200000),
  })
});

startServer();


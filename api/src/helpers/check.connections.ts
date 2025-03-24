import { Connection } from 'mongoose';
import * as os from 'os';

const checkConnections = async (connection: Connection) => {
    try {
        const connections = connection.collections.length
        console.log(`🔌 Connected to MongoDB: ${connections} connections`);
        return connections;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

const checkOverload = async (connection: Connection) => {
   const numCores = os.cpus().length;
   const memoryUsage = process.memoryUsage();
   const maxConnections = numCores * 4;
   const activeConnections = connection.readyState;

   console.log(`Active connections: ${activeConnections}`);
   console.log(`Max connections: ${maxConnections}`);
   console.log(` • RSS: ${memoryUsage.rss / 1024 / 1024} MB`);
   console.log(` • Heap total: ${memoryUsage.heapTotal / 1024 / 1024} MB`);
   console.log(` • Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`);
   console.log(` • External: ${memoryUsage.external / 1024 / 1024} MB`);
   if (activeConnections > maxConnections) {
       console.debug(`Active connections exceed max connections`);
   }
   return {
       cpuCores: numCores,
       memoryUsage: memoryUsage,
       activeConnections,
   }
};

const startMonitoring = async (connection: Connection, intervalMs =15000) => {
    return setInterval(async () => {
        await checkOverload(connection);
    }, intervalMs)
}

export { startMonitoring, checkConnections };

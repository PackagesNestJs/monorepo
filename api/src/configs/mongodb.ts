const configDB = (environment: string) => {
  switch (environment) {
    case 'development':
      return {
        app: {
          port: process.env.PORT || 3001,
        },
        database: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 27017,
          name: process.env.DB_NAME || 'myappdb',
          user: process.env.DB_USER || 'myadmin',
          password: process.env.DB_PASSWORD || 'mysecret',
          database: process.env.DB_NAME || 'mydatabase',
          authSource: process.env.DB_AUTH_SOURCE || 'admin',
        }
      };
    case 'production':
      return {
        app: {
          port: process.env.PORT || 3000,
        },
        database: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 27017,
          name: process.env.DB_NAME || 'myappdb',
          user: process.env.DB_USER || 'myadmin',
          password: process.env.DB_PASSWORD || 'mysecret',
          database: process.env.DB_NAME || 'mydatabase',
          authSource: process.env.DB_AUTH_SOURCE || 'myappdb',
        }
      };
    default:
      return {
        app: {
          port: process.env.PORT || 3002,
        },
        database: {
          host: process.env.DB_HOST || 'localhost',
          port: process.env.DB_PORT || 27017,
          name: process.env.DB_NAME || 'myappdb',
          user: process.env.DB_USER || 'myadmin',
          password: process.env.DB_PASSWORD || 'mysecret',
          database: process.env.DB_NAME || 'mydatabase',
          authSource: process.env.DB_AUTH_SOURCE || 'myappdb',
        }
      };
  }
};
const environment = process.env.NODE_ENV || 'development';
export default configDB(environment);

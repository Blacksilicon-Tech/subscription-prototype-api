export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'secretKey',
    expiresIn: '1d',
  },
  api: {
    secret: process.env.API_SECRET || 'apiSecretKey',
    expiresIn: '30d',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'P@ssw0rd',
    database: process.env.DB_DATABASE || 'subspropdb',
  },
  frontendUrl: process.env.FRONTEND_URL,
});

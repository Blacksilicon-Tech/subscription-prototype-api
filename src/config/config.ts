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
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  frontendUrl: process.env.FRONTEND_URL,
});

import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: `.env.${process.env.NODE_ENV}` });

export default {
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seedDatabase: Boolean(process.env.SEED_DB)
  },
  port: parseInt(process.env.PORT) || 3000,
  customResponse: process.env.CUSTOM_RESPONSE === 'true'
};

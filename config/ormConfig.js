const { config } = require('dotenv');
const env = process.env.NODE_ENV;
config({ path: `.env.${env}` });


module.exports = {
    [env]: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
};

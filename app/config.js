const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const ENV = process.env.NODE_ENV || 'development';
const config = {
    TZ: process.env.TZ,
    MONGO_URI: process.env.MONGO_URI,
    LOG_TYPE: ENV == 'development' ? 'dev' : 'common',
    API_VERSION: process.env.API_VERSION
};

module.exports = config;
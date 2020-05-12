const path = require('path');
const fs = require('fs');

/**
 * Check if default .env exist to use for custom environment configuration
 * Else --> use .env.${APP_ENV} file
 */
const customEnvPath = path.resolve(process.cwd(), `.env.${process.env.APP_ENV}`);
const defaultEnvPath = path.resolve(process.cwd(), '.env');

const envPath = fs.existsSync(customEnvPath) ? customEnvPath : defaultEnvPath;

require('dotenv').config({ path: envPath });

// ========================================================== //

// Define global NODE_ENV based variables to easily usage
const { NODE_ENV = 'production' } = process.env;

global.NODE_ENV = NODE_ENV;
global.__DEV__ = NODE_ENV === 'development';
global.__PROD__ = NODE_ENV === 'production';

// /Users/wilson/Desktop/2025/ipt-projects/api-boilerplate-2025/config/index.js
// (Make sure require('dotenv').config(); is called in server.js first!)

module.exports = {
    database: {
        host: process.env.DB_HOST || 'localhost', // Provide defaults if desired
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    },
    secret: process.env.JWT_SECRET,
    emailFrom: process.env.EMAIL_FROM,
    smtpOptions: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    isProduction: process.env.NODE_ENV === 'production',
    // Add other config derived from environment variables
};

// Then, in other files, use it like:
// const config = require('./config'); // Adjust path as needed
// const sequelize = new Sequelize(config.database.database, ...);
// const jwtSecret = config.secret;

// Configuration for database connection
require('dotenv').config();
const mysql = require('mysql');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const connectDB = () => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.log('Error connecting to database...', err);
        } else {
            console.log('Connected to database!');
        }
    });

    return connection;
}

module.exports = connectDB;
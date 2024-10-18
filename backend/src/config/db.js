const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER, // Your MySQL username
    password: process.env.DB_PASSWORD, // Your MySQL password
    database: 'deteksi_kerusakan_jalan'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;

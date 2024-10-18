const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: (email, password, name) => {
        return new Promise((resolve, reject) => {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
            db.query(query, [email, hashedPassword, name], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
};

module.exports = User;

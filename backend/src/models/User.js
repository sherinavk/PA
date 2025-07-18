const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    // Ubah fungsi create untuk menerima parameter role
   create: (email, hashedPassword, username, role ) => {  // Default role = 'user'
        console.log('Hashed Password:', hashedPassword, ' email:', email, ' username:', username, ' role:', role); // Log untuk melihat hash lengkap dan role
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)';
            db.query(query, [email, hashedPassword, username, role], (err, results) => {
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
    },

    // Fungsi untuk menemukan user berdasarkan ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
};

module.exports = User;

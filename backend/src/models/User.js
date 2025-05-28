const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    // Ubah fungsi create untuk menerima parameter role dan avatar
    create: (email, hashedPassword, username, role = 'user', avatar = null) => { // Default role = 'user', avatar bisa null
        console.log('Hashed Password:', hashedPassword, 'email:', email, 'username:', username, 'role:', role, 'avatar:', avatar); // Log untuk melihat data
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (email, password, username, role, avatar) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [email, hashedPassword, username, role, avatar], (err, results) => {
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
    },

    // Fungsi untuk memperbarui user profile termasuk avatar
    updateProfile: (id, username, firstName, lastName, avatar) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET username = ?, firstName = ?, lastName = ?, avatar = ? WHERE id = ?';
            db.query(query, [username, firstName, lastName, avatar, id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = User;

const db = require('../config/db');

const Jalan = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO jalan (nama, kondisi) VALUES (?, ?)";
            db.query(query, [data.nama, data.kondisi], (error, results) => {
                if (error) return reject(error);
                resolve(results.insertId);
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM jalan";
            db.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM jalan WHERE id = ?";
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            const query = "UPDATE jalan SET nama = ?, kondisi = ? WHERE id = ?";
            db.query(query, [data.nama, data.kondisi, id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM jalan WHERE id = ?";
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows);
            });
        });
    }
};

module.exports = Jalan;

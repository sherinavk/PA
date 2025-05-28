const db = require('../config/db');

module.exports = (sequelize, DataTypes) => {
    const Jalan = sequelize.define('Jalan', {
      nama: {
        type: DataTypes.STRING,
        allowNull: false
      },
      kondisi: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    });
  
    return Jalan;
  };

const Jalan = {
    create: (data) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO jalan (nama, kondisi) VALUES (?, ?)';
            db.query(query, [data.nama, data.kondisi], (error, results) => {
                if (error) return reject(error);
                resolve({ id: results.insertId, ...data });
            });
        });
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM jalan';
            db.query(query, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    findByDateRange: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM jalan WHERE DATE(created_at) BETWEEN ? AND ?';
            db.query(query, [startDate, endDate], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM jalan WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results[0] || null);
            });
        });
    },

    update: (id, data) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE jalan SET nama = ?, kondisi = ? WHERE id = ?';
            db.query(query, [data.nama, data.kondisi, id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM jalan WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) return reject(error);
                resolve(results.affectedRows > 0);
            });
        });
    },

};

module.exports = Jalan;

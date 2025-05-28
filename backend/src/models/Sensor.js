const db = require('../config/db');

const Sensor = {
    create: ({ kode_data, kondisi, created_at, acceleration_x , acceleration_y , acceleration_z ,gyro_x , gyro_y , gyro_z , latitude , longitude }) => {
        const query = 'INSERT INTO sensor (kode_data, kondisi, created_at) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(query, [kode_data, kondisi, created_at, acceleration_x , acceleration_y , acceleration_z ,gyro_x , gyro_y , gyro_z , latitude , longitude], (err, results) => {
                if (err) {
                    console.error('Database Error:', err);
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    },

    getAll: () => {
        const query = 'SELECT * FROM sensor';
        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    updateRoadCondition: (jalan_id,kode_data, kondisi, created_at, acceleration_x , acceleration_y , acceleration_z ,gyro_x , gyro_y , gyro_z , latitude , longitude) => {
        const query = 'UPDATE jalan SET kondisi = ?, created_at = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(query, [jalan_id,kode_data, kondisi, created_at, acceleration_x , acceleration_y , acceleration_z ,gyro_x , gyro_y , gyro_z , latitude , longitude], (err, results) => {
                if (err) {
                    console.error('Database Error (update jalan):', err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};

module.exports = Sensor;

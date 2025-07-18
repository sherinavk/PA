const db = require('../config/db');

const Sensor = {
  // ✅ Simpan data sensor baru
  create: async ({
    kode_data,
    nama_jalan,
    kondisi,
    created_at,
    acceleration_x,
    acceleration_y,
    acceleration_z,
    gyro_x,
    gyro_y,
    gyro_z,
    latitude,
    longitude
  }) => {
    const query = `
      INSERT INTO sensor 
      (kode_data, nama_jalan, kondisi, created_at, acceleration_x, acceleration_y, acceleration_z, 
       gyro_x, gyro_y, gyro_z, latitude, longitude) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [
          kode_data,
          nama_jalan,
          kondisi,
          created_at,
          acceleration_x,
          acceleration_y,
          acceleration_z,
          gyro_x,
          gyro_y,
          gyro_z,
          latitude,
          longitude
        ], (err, results) => {
          if (err) {
            console.error('❌ Database Error (create):', err);
            return reject(err);
          }
          resolve(results);
        });
      });
      return results.insertId;
    } catch (err) {
      console.error('❌ Error in create:', err);
      throw err;
    }
  },
  
getByDateRange: async (startDate, endDate) => {
  const query = `
    SELECT * FROM sensor 
    WHERE DATE(created_at) BETWEEN ? AND ?
    ORDER BY created_at ASC
  `;
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
          console.error('❌ Database Error (getByDateRange):', err);
          return reject(err);
        }
        resolve(results);
      });
    });
    return results;
  } catch (err) {
    console.error('❌ Error in getByDateRange:', err);
    throw err;
  }
},
  // ✅ Ambil semua data
  getAll: async () => {
    const query = 'SELECT * FROM sensor ORDER BY created_at DESC';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
          if (err) {
            console.error('❌ Database Error (getAll):', err);
            return reject(err);
          }
          resolve(results);
        });
      });
      return results;
    } catch (err) {
      console.error('❌ Error in getAll:', err);
      throw err;
    }
  },

  // ✅ Ambil data by ID
  getById: async (id) => {
    const query = 'SELECT * FROM sensor WHERE id = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
          if (err) {
            console.error('❌ Database Error (getById):', err);
            return reject(err);
          }
          resolve(results[0] || null);
        });
      });
      return results;
    } catch (err) {
      console.error('❌ Error in getById:', err);
      throw err;
    }
  },

  // ✅ Update data full (nama_jalan & kondisi)
  updateById: async (id, { nama_jalan, kondisi }) => {
    const query = `
      UPDATE sensor 
      SET nama_jalan = ?, kondisi = ? 
      WHERE id = ?
    `;
    try {
      const result = await new Promise((resolve, reject) => {
        db.query(query, [nama_jalan, kondisi, id], (err, result) => {
          if (err) {
            console.error('❌ Database Error (updateById):', err);
            return reject(err);
          }
          resolve(result);
        });
      });
      return result.affectedRows > 0;
    } catch (err) {
      console.error('❌ Error in updateById:', err);
      throw err;
    }
  },

  // ✅ Partial update (nama_jalan & kondisi saja)
  partialUpdate: async (id, fields) => {
    try {
      if (!fields.nama_jalan || !fields.kondisi) {
        console.warn('⚠️ nama_jalan dan kondisi wajib diisi');
        throw new Error('Field nama_jalan dan kondisi wajib diisi.');
      }

      const query = `
        UPDATE sensor 
        SET nama_jalan = ?, kondisi = ?
        WHERE id = ?
      `;
      const values = [fields.nama_jalan, fields.kondisi, id];

      console.log('🔥 QUERY:', query);
      console.log('🔥 VALUES:', values);

      const result = await new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
          if (err) {
            console.error('❌ DB Error (partialUpdate):', err);
            return reject(err);
          }
          resolve(result);
        });
      });

      if (result.affectedRows === 0) {
        console.warn('⚠️ Tidak ada baris diupdate (ID salah atau data sama)');
        return false;
      }

      console.log('✅ Data berhasil diupdate');
      return true;
    } catch (err) {
      console.error('❌ Error in partialUpdate:', err);
      throw err;
    }
  },

  // ✅ Hapus data berdasarkan ID
  delete: async (id) => {
    const query = 'DELETE FROM sensor WHERE id = ?';
    try {
      const results = await new Promise((resolve, reject) => {
        db.query(query, [id], (err, results) => {
          if (err) {
            console.error('❌ Database Error (delete):', err);
            return reject(err);
          }
          resolve(results);
        });
      });
      return results.affectedRows > 0;
    } catch (err) {
      console.error('❌ Error in delete:', err);
      throw err;
    }
  }
};

module.exports = Sensor;
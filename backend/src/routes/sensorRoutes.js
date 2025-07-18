const express = require('express');
const router = express.Router();
const db = require('../config/db'); 
const sensorController = require('../controllers/sensorController');

router.get('/sensor', sensorController.getAllSensor);
router.get('/sensor/by-date-range', sensorController.getSensorByDateRange);
router.get('/sensor/:id', sensorController.getSensorById);
router.put('/sensor/update/:id', sensorController.updateSensor);
router.delete('/sensor/:id', sensorController.deleteSensor);

router.use(express.json());  

router.get('/sensor_data', (req, res) => {
  const query = `
    SELECT id, nama_jalan AS nama, kondisi, latitude, longitude, created_at 
    FROM sensor ORDER BY created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error mengambil data sensor:", err);
      return res.status(500).json({ message: 'Server error.' });
    }

 
    res.json(results);
  });
});


router.get('/list-nama-jalan', (req, res) => {
  const query = 'SELECT DISTINCT nama_jalan FROM sensor WHERE nama_jalan IS NULL ORDER BY nama_jalan ASC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Gagal ambil data jalan' });
    res.json(results.map(row => row.nama_jalan));
  });
});


router.post('/data', async (req, res) => {
    const {
      acceleration_x,
      acceleration_y,
      acceleration_z,
      gyro_x,
      gyro_y,
      gyro_z,
      latitude,
      longitude,
      kode_data,       
      kondisi,
      nama_jalan,
      created_at
    } = req.body;

    // Validasi data yang diterima
    if (
      !isNaN(acceleration_x) && typeof acceleration_x === "number" &&
      !isNaN(acceleration_y) && typeof acceleration_y === "number" &&
      !isNaN(acceleration_z) && typeof acceleration_z === "number" &&
      !isNaN(gyro_x) && typeof gyro_x === "number" &&
      !isNaN(gyro_y) && typeof gyro_y === "number" &&
      !isNaN(gyro_z) && typeof gyro_z === "number" &&
      !isNaN(latitude) && typeof latitude === "number" &&
      !isNaN(longitude) && typeof longitude === "number" &&
      typeof nama_jalan === "string" && 
      typeof kode_data === "string" && 
      typeof kondisi === "string" && 
      (created_at instanceof Date || !isNaN(Date.parse(created_at))) 
    ) {
      const query = `
        INSERT INTO sensor
        (kode_data, kondisi, nama_jalan, created_at , acceleration_x, acceleration_y,
         acceleration_z, gyro_x, gyro_y, gyro_z, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;
      


      try {
        const result = await new Promise((resolve, reject) => {
          db.query(query, [
            kode_data, kondisi, nama_jalan , created_at, acceleration_x, acceleration_y, acceleration_z,
            gyro_x, gyro_y, gyro_z, latitude, longitude
          ], (err, result) => {
            if (err) {
              console.error('DB Insert Error:', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        // Jika berhasil, kirimkan response sukses
        res.status(201).json({ message: "Data sensor disimpan ke database!", id: result.insertId });
      } catch (err) {
        // Jika terjadi error pada query, kirimkan response error
        res.status(500).json({ message: "Gagal simpan ke database", error: err });
      }
    } else {
      // Jika data tidak valid, kembalikan status 400
      res.status(400).json({ message: "Format data tidak valid!" });
    }
});

module.exports = router;

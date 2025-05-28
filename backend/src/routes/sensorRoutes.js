const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan path benar

router.post('/data', (req, res) => {
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
      kondisi_jalan    
    } = req.body;

    if (
      typeof acceleration_x === "number" &&
      typeof acceleration_y === "number" &&
      typeof acceleration_z === "number" &&
      typeof gyro_x === "number" &&
      typeof gyro_y === "number" &&
      typeof gyro_z === "number" &&
      typeof latitude === "number" &&
      typeof longitude === "number" &&
      typeof kode_data === "string" &&  // Validate kode_data
      typeof kondisi_jalan === "string" // Validate kondisi_jalan
    ) {
      // Query MySQL simpan data
      const sql = `
        INSERT INTO sensor
        (kode_data, kondisi_jalan, acceleration_x, acceleration_y, acceleration_z, gyro_x, gyro_y, gyro_z, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(sql, [
        kode_data, kondisi_jalan, acceleration_x, acceleration_y, acceleration_z,
        gyro_x, gyro_y, gyro_z, latitude, longitude
      ], (err, result) => {
        if (err) {
          console.error('DB Insert Error:', err);
          res.status(500).json({ message: "Gagal simpan ke database", error: err });
        } else {
          res.status(201).json({ message: "Data sensor disimpan ke database!", id: result.insertId });
        }
      });
    } else {
      res.status(400).json({ message: "Format data tidak valid!" });
    }
});

module.exports = router;

const Sensor = require('../models/Sensor');
const db = require('../config/db');

const sensorController = {
  // ✅ Simpan data sensor baru
  storeSensor: async (req, res) => {
    try {
      const {
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
      } = req.body;

      if (!kode_data || !nama_jalan || !kondisi) {
        return res.status(400).json({ message: 'kode_data, nama_jalan, dan kondisi wajib diisi.' });
      }

      const newId = await Sensor.create({
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
      });

      res.status(201).json({ id: newId, message: 'Data sensor berhasil disimpan.' });
    } catch (error) {
      console.error('❌ Error storeSensor:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Ambil semua data sensor
  getAllSensor: async (req, res) => {
    try {
      const sensors = await Sensor.getAll();
      res.status(200).json(sensors);
    } catch (error) {
      console.error('❌ Error getAllSensor:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Ambil data sensor berdasarkan rentang tanggal
  getSensorByDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Tanggal mulai dan akhir wajib diisi.' });
      }

      const results = await Sensor.getByDateRange(startDate, endDate);

      if (!results || results.length === 0) {
        return res.status(404).json({ message: `Tidak ada data untuk ${startDate} - ${endDate}` });
      }

      const stats = {
        noDamage: 0,
        slightlyDamaged: 0,
        moderatelyDamaged: 0,
        badlyDamaged: 0,
        labels: [`${startDate} - ${endDate}`],
      };

      results.forEach(sensor => {
        if (sensor.kondisi === 'tidak_rusak') stats.noDamage++;
        else if (sensor.kondisi === 'rusak_ringan') stats.slightlyDamaged++;
        else if (sensor.kondisi === 'rusak_sedang') stats.moderatelyDamaged++;
        else if (sensor.kondisi === 'rusak_berat') stats.badlyDamaged++;
      });

      res.status(200).json(stats);
    } catch (error) {
      console.error('❌ Error getSensorByDateRange:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Ambil data sensor berdasarkan ID
  getSensorById: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

      const sensor = await Sensor.getById(id);
      if (!sensor) return res.status(404).json({ message: 'Data tidak ditemukan.' });

      res.status(200).json(sensor);
      console.log('📥 getSensorById param id:', id);
    } catch (error) {
      console.error('❌ Error getSensorById:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Update data sensor
  updateSensor: async (req, res) => {
    try {
      const { id } = req.params;
      const { nama_jalan, kondisi } = req.body;

      console.log("🔄 UPDATE jalan dengan ID:", id);
      console.log("📥 Data diterima:", req.body);

      const success = await Sensor.updateById(id, { nama_jalan, kondisi });

      if (!success) {
        console.warn("⚠️ Tidak ada baris diupdate (ID salah atau data sama)");
        return res.status(404).send('Data tidak ditemukan atau tidak ada perubahan');
      }

      res.status(200).json({ message: '✅ Update berhasil' });
    } catch (error) {
      console.error('❌ Error updateSensor:', error);
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ Hapus data sensor
  deleteSensor: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'ID wajib diisi.' });

      const result = await Sensor.delete(id);
      if (!result) return res.status(404).json({ message: 'Data tidak ditemukan.' });

      res.status(200).json({ message: 'Data sensor berhasil dihapus.' });
    } catch (error) {
      console.error('❌ Error deleteSensor:', error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = sensorController;

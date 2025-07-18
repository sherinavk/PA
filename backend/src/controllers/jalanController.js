const Jalan = require('../models/Sensor');

const jalanController = {
   storeJalan: async (req, res) => {
  try {
    const { nama, kondisi, latitude, longitude } = req.body; // Menerima latitude dan longitude
    const jalan = await Jalan.create({ nama, kondisi, latitude, longitude });
    res.status(201).json(jalan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

    getAllJalan: async (req, res) => {
        try {
            const jalans = await Jalan.findAll();
            res.status(200).json(jalans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getJalanByDateRange: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).json({ error: 'Tanggal mulai (startDate) dan tanggal akhir (endDate) harus disertakan dalam query parameter.' });
            }

            const results = await Jalan.findByDateRange(startDate, endDate);

            if (results.length === 0) {
                return res.status(404).json({ message: `Tidak ada data untuk rentang tanggal ${startDate} hingga ${endDate}` });
            }

            const stats = {
                slightlyDamaged: 0,
                moderatedDamaged: 0,
                badlyDamaged: 0,
                labels: [`${startDate} - ${endDate}`],
            };

            results.forEach(jalan => {
                if (jalan.kondisi === 'rusak ringan') {
                    stats.slightlyDamaged++;
                } else if (jalan.kondisi === 'rusak sedang') {
                    stats.moderatedDamaged++;
                } else if (jalan.kondisi === 'rusak berat') {
                    stats.badlyDamaged++;
                }
            });

            res.status(200).json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getJalanById: async (req, res) => {
        try {
          const { id } = req.params;
          const jalan = await Jalan.findByPk(id); 
          if (!jalan) return res.status(404).json({ message: 'Jalan not found' });
          res.status(200).json(jalan);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      
getRoad: async (req, res) => {
  try {
    const filter = req.query.nama_jalan; // ambil dari query param
    const result = await Jalan.findByFilter(filter);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
},



    updateJalan: async (req, res) => {
        try {
          const { id } = req.params;
          const { nama, kondisi, latitude, longitude } = req.body; // Menambahkan latitude dan longitude
          const updated = await Jalan.update(
            { nama, kondisi, latitude, longitude }, 
            { where: { id } }
          );
          if (!updated) return res.status(404).json({ message: 'Jalan not found' });
          res.status(200).json({ message: 'Jalan updated successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
      

    deleteJalan: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Jalan.delete(id);
            if (!deleted) return res.status(404).json({ message: 'Jalan not found' });
            res.status(200).json({ message: 'Jalan deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = jalanController;

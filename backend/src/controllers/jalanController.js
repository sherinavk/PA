const Jalan = require('../models/Jalan');

const jalanController = {
    storeJalan: async (req, res) => {
        try {
            const { nama, kondisi } = req.body;
            const id = await Jalan.create({ nama, kondisi });
            res.status(201).json({ id, nama, kondisi });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllJalan: async (req, res) => {
        try {
            const jalan = await Jalan.findAll();
            res.status(200).json(jalan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getJalanById: async (req, res) => {
        try {
            const { id } = req.params;
            const jalan = await Jalan.findById(id);
            if (!jalan) return res.status(404).json({ message: 'Jalan not found' });
            res.status(200).json(jalan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateJalan: async (req, res) => {
        try {
            const { id } = req.params;
            const { nama, kondisi } = req.body;
            const updated = await Jalan.update(id, { nama, kondisi });
            if (updated === 0) return res.status(404).json({ message: 'Jalan not found' });
            res.status(200).json({ message: 'Jalan updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteJalan: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await Jalan.delete(id);
            if (deleted === 0) return res.status(404).json({ message: 'Jalan not found' });
            res.status(200).json({ message: 'Jalan deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = jalanController;

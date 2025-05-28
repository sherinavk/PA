const express = require('express');
const router = express.Router();
const jalanController = require('../controllers/jalanController');

router.post('/jalan/tambah', jalanController.storeJalan);
router.get('/jalan', jalanController.getAllJalan);
router.get('/jalan/by-date-range', jalanController.getJalanByDateRange);
router.get('/jalan/:id', jalanController.getJalanById);
router.put('/jalan/:id', jalanController.updateJalan);
router.delete('/jalan/:id', jalanController.deleteJalan);

module.exports = router;

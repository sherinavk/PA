const express = require('express');
const jalanController = require('../controllers/jalanController');

const router = express.Router();

// Routes for managing road data
router.post('/tambah', jalanController.storeJalan);        // Create a new road entry
router.get('/semua', jalanController.getAllJalan);       // Get all road entries
router.get('/:id', jalanController.updateJalan);     // Update a specific road entry by ID
router.delete('/:id', jalanController.deleteJalan);   // Delete a specific road entry by ID

module.exports = router;

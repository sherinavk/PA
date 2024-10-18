const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Route untuk Registrasi dan Login
router.post('/register', register);
router.post('/login', login);

module.exports = router;

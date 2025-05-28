const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// Route untuk Registrasi dan Login
router.post('/register', register);
router.post('/login', login);

// Route untuk mendapatkan profil pengguna yang sudah login
router.get('/profile', auth, (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        role: req.user.role,
    });
});

module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Fungsi untuk registrasi
const register = async (req, res) => {
    const { email, username, password, role } = req.body;

    console.log('Data yang diterima untuk registrasi:', { email, username, password, role });

    if (!password) {
        return res.status(400).json({ message: 'Password is required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kirim parameter satu per satu sesuai definisi fungsi create
        const newUser = await User.create(email, hashedPassword, username, role);

        res.status(201).json({
            message: 'User registered successfully!',
            user: newUser,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({
            message: 'Registration failed',
            error: error.message,
        });
    }
};



// Fungsi untuk login
const login = async (req, res) => {
    const { email, password } = req.body;

    // Menampilkan data yang diterima dari frontend untuk debugging
    console.log('Data yang diterima untuk login:', { email, password });

    try {
        // Mencari user berdasarkan email
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Mengecek password yang diterima dengan yang ada di database
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Membuat JWT token setelah login berhasil
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                photo: user.photo
            },
        });

        console.log('Role Admin :', user.role);
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = { register, login };
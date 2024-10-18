const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const register = async (req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('Hashed Password:', hashedPassword); // Log untuk melihat hash lengkap
    try {
        await User.create(email, hashedPassword, name);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        console.log('User found:', user); // Log user yang ditemukan

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('Input Password:', password);
        console.log('Stored Hash Password:', user.password);

        const isMatch = bcrypt.compareSync(password, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token); // Log token yang dihasilkan

        // Log sebelum mengirimkan respons ke klien
        console.log('Response to Client:', { token, user: { id: user.id, name: user.name, email: user.email } });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};





module.exports = { register, login };

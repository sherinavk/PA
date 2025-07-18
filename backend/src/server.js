const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('../src/routes/authRoutes');
const jalanRoutes = require('../src/routes/jalanRoutes');
const sensorRoutes = require('../src/routes/sensorRoutes'); // Pastikan path benar
const userRoutes = require('../src/routes/userRoutes'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
 
app.options('*', cors()); 

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/jalan', jalanRoutes);
app.use('/api/sensor', sensorRoutes);
app.use('/api/users', userRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
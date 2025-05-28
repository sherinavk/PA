const express = require('express');
const cors = require('cors');
const authRoutes = require('../src/routes/authRoutes');
const jalanRoutes = require('../src/routes/jalanRoutes');
const sensorRoutes = require('../src/routes/sensorRoutes');
const userRoutes = require('./routes/userRoutes'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow large payloads
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

// Route configurations
app.use('/api/auth', authRoutes);
app.use('/api/jalan', jalanRoutes);
app.use('/api/sensor', sensorRoutes); 
app.use('/api', userRoutes);

// Static file serving (e.g., avatars)
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

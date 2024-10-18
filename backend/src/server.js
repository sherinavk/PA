const express = require('express');
const cors = require('cors');
const authRoutes = require('../src/routes/authRoutes');
const jalanRoutes = require('../src/routes/jalanRoutes'); // Import jalan routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jalan', jalanRoutes); // Use jalan routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

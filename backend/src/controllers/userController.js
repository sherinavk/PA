const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const fs = require('fs');

const getAllSensorData = (req, res) => {
  db.query('SELECT * FROM sensor ORDER BY created_at DESC LIMIT 1', (err, result) => {
    if (err) {
      console.error('Error fetching sensor data:', err);
      return res.status(500).json({ message: 'Server error.' });
    }

    res.status(200).json(result);
  });
};
// Set up storage engine untuk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/profile_pictures'); // Folder untuk menyimpan foto profil
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage: storage });

// ✅ Fungsi untuk update username, firstName, dan lastName sekaligus
const updateUserProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, firstName, lastName } = req.body;

  if (!username && !firstName && !lastName) {
    return res.status(400).json({ message: 'At least one field is required to update.' });
  }

  const fields = [];
  const values = [];

  if (username) {
    fields.push('username = ?');
    values.push(username);
  }
  if (firstName) {
    fields.push('firstName = ?');
    values.push(firstName);
  }
  if (lastName) {
    fields.push('lastName = ?');
    values.push(lastName);
  }

  values.push(userId);

  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  try {
    await new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.status(200).json({ message: 'User profile updated successfully.' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ✅ Fungsi untuk memperbarui foto profil
const updateProfilePicture = async (req, res) => {
  const userId = req.params.id;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  try {
    const query = 'SELECT photo FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user profile picture:', err);
        return res.status(500).json({ message: 'Server error.' });
      }

      const oldProfilePicture = result[0]?.photo;
      if (oldProfilePicture) {
        const oldProfilePicturePath = path.join(__dirname, '..', oldProfilePicture.replace('/uploads/profile_pictures', 'src/uploads/profile_pictures'));
        if (fs.existsSync(oldProfilePicturePath)) {
          fs.unlinkSync(oldProfilePicturePath); // Hapus file lama
        }
      }

      const profilePictureUrl = `/uploads/profile_pictures/${req.file.filename}`;

      const updateQuery = 'UPDATE users SET photo = ? WHERE id = ?';
      db.query(updateQuery, [profilePictureUrl, userId], (err, result) => {
        if (err) {
          console.error('Error updating profile picture:', err);
          return res.status(500).json({ message: 'Server error.' });
        }
        res.status(200).json({
          message: 'Profile picture updated successfully.',
          profilePicture: profilePictureUrl
        });
      });
    });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  updateUserProfile,
  updateProfilePicture,
  upload
};

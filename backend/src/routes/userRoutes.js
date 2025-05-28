const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({
  dest: 'src/uploads/profile_pictures/', 
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Please upload an image file.'));
    }
    cb(null, true);
  },
});

const router = express.Router();

// Endpoint untuk mengunggah avatar
router.put('/users/:id', upload.single('avatar'), async (req, res) => {
  try {
    // Ambil path file avatar yang di-upload
    const avatarPath = path.join('src', 'uploads', 'profile_pictures', req.file.filename);

    // Perbarui data pengguna di database dan simpan path avatar
    const userId = req.params.id;
    const { username, firstName, lastName } = req.body;

    // Update data user di database (contoh)
    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      username,
      firstName,
      lastName,
      avatar: avatarPath,
    });

    res.status(200).json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile.', error: err.message });
  }
});

module.exports = router;

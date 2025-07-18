const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const multer = require('multer');

// Set up multer for profile picture upload
const upload = multer({ dest: 'src/uploads/profile_pictures/' });

router.put('/users/:id',UserController.updateUserProfile);
// Endpoint untuk update foto profil
router.put('/:id/profile-picture', upload.single('profilePicture'), UserController.updateProfilePicture);

module.exports = router;
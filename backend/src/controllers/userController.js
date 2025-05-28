const UserController = {
  updateUserProfile: [
    upload.single('avatar'),
    async (req, res) => {
      const { username, firstName, lastName } = req.body;
      let query, params;

      try {
        // Jika user upload avatar baru
        if (req.file) {
          const avatarPath = `/uploads/avatars/${req.file.filename}`;
          query = `
            UPDATE users 
            SET username = ?, firstName = ?, lastName = ?, avatar = ?
            WHERE id = ?
          `;
          params = [username, firstName, lastName, avatarPath, req.params.id];
        } else {
          // Jika tidak upload avatar
          query = `
            UPDATE users 
            SET username = ?, firstName = ?, lastName = ?
            WHERE id = ?
          `;
          params = [username, firstName, lastName, req.params.id];
        }

        await new Promise((resolve, reject) => {
          db.query(query, params, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
        });

        // Optional: ambil user yang sudah diupdate untuk frontend (avatar barunya)
        const [user] = await new Promise((resolve, reject) => {
          db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });

        res.status(200).json({
          message: 'Profile updated successfully.',
          user
        });
      } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error.' });
      }
    }
  ]
};

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token required.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        // Menyisipkan data dari token ke dalam req
        req.user = {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,

        };
        console.log("Decoded user:", req.user);

        next();
    });
};

module.exports = auth;

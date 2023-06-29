// authMiddleware.js
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Non connecté' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

    if (decoded.isAdmin) {
        req.user.isAdmin = true;
    }
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
}

module.exports = isAuthenticated;

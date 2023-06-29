// authMiddleware.js
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      return res.status(401).json({ error: "Token invalide" });
    }
  } else {
    res.status(401).json({ error: "Non connecté" });
  }
}

function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.isAdmin)
        next();
      else 
        throw new Error('user is not admin')
    } catch (error) {
      return res.status(401).json({ error: "Token invalide" });
    }
  } else {
    res.status(401).json({ error: "Non connecté" });
  }
}

module.exports = {isAuthenticated, isAdmin};
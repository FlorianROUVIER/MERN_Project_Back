// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    password: user.password,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // JWT invalide 
  }
}

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    return null; // Utilisateur non trouvé
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  return user;
}

module.exports = { generateToken, verifyToken, authenticateUser };

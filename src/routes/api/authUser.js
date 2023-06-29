const express = require('express');
const router = express.Router();
const Users = require('../../models/User');
const { generateToken, authenticateUser } = require('../../auth/auth');
const isAuthenticated = require('../../middleware/authMiddleware');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = generateToken(user);
    res.json({token, user:
      {
        firstName: user.firstName, 
        lastName: user.lastName,
        isAdmin: user.isAdmin
      }});
    
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

module.exports = router;

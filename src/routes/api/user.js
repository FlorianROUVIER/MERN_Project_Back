const express = require('express');
const router = express.Router();
const Users = require('../../models/User');
const mongoose = require('mongoose');
const { generateToken, authenticateUser } = require('../../auth/auth');


// Afficher tous les utilisateurs
router.get('/admin', (req, res) => {
    Users.find()
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ err: 'nope' }));
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});
  


// Créer un nouvel utilisateur
// router.post('/admin', async (req, res) => {
//     const user = new Users({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//       phoneNumber: req.body.phoneNumber,
//       isAdmin: req.body.isAdmin || false
//     });
//     console.log(req.body)
//     try {
//       const newUser = await user.save();
//       res.status(201).json(newUsers);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Afficher un utilisateur par ID
//   router.get('/admin/:id', getUser,  async(req, res) => {
//     try {
//       const id = new mongoose.Types.ObjectId(req.params.id)
//       const user = await Users.find(id);
//       if (user == null) {
//         return res.status(404).json({ message: 'Utilisateur non trouvé' });
//       }
//       res.user = user;
//     } catch (err) {
//       return res.status(500).json({ message: err.message });
//     }
//     res.json(res.user);
//   });
  
//   // Mettre à jour un utilisateur
//   router.put('/admin/:id', getUser, async (req, res) => {
//     if (req.body.firstName != null) {
//       res.user.firstName = req.body.firstName;
//     }
  
//     if (req.body.lastName != null) {
//       res.user.lastName = req.body.lastName;
//     }
  
//     if (req.body.email != null) {
//       res.user.email = req.body.email;
//     }
  
//     if (req.body.password != null) {
//       res.user.password = req.body.password;
//     }
  
//     if (req.body.phoneNumber != null) {
//       res.user.phoneNumber = req.body.phoneNumber;
//     }
  
//     if (req.body.isAdmin != null) {
//       res.user.isAdmin = req.body.isAdmin;
//     }
  
//     try {
//       const updatedUser = await res.user.save();
//       res.json(updatedUser);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Supprimer un utilisateur
//   router.delete('/admin/:id', getUser, async (req, res) => {
//     try {
//       await res.user.remove();
//       res.json({ message: 'Utilisateur supprimé' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   async function getUser(req, res, next) {
//     try {
//       if (typeof req.params.id !== 'string') {
//         throw new Error('ID invalide');
//       }
//       const user = await Users.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'Utilisateur non trouvé' });
//       }
//       res.user = user;
//       next();
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }

module.exports = router;
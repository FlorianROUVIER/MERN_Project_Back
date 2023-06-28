const express = require('express');
const router = express.Router();
const Users = require('../../models/User');
const mongoose = require('mongoose');

// Afficher tous les utilisateurs
router.get('/', (req, res) => {
    Users.find()
        .then(question => res.json(question))
        .catch(err => res.status(404).json({err: 'nope'}))
});

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
    const user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      isAdmin: req.body.isAdmin || false
    });
    console.log(req.body)
    try {
      const newUser = await user.save();
      res.status(201).json(newUsers);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Afficher un utilisateur par ID
  router.get('/:id', getUser,  async(req, res) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params.id)
      const user = await Users.find(id);
      if (user == null) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.user = user;
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(res.user);
  });
  
  // Mettre à jour un utilisateur
  router.put('/:id', getUser, async (req, res) => {
    if (req.body.firstName != null) {
      res.user.firstName = req.body.firstName;
    }
  
    if (req.body.lastName != null) {
      res.user.lastName = req.body.lastName;
    }
  
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
  
    if (req.body.password != null) {
      res.user.password = req.body.password;
    }
  
    if (req.body.phoneNumber != null) {
      res.user.phoneNumber = req.body.phoneNumber;
    }
  
    if (req.body.isAdmin != null) {
      res.user.isAdmin = req.body.isAdmin;
    }
  
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Supprimer un utilisateur
  router.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: 'Utilisateur supprimé' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Middleware pour récupérer un utilisateur par ID
  async function getUser(req, res, next) {
    try {
      console.log(req.params)
      if(typeof req.params.id != 'string' ){
        throw new Error('id invalid')
      }
      next();
    } 
    catch (error){
      return res.status(404).json(JSON.stringify(error)).end()
    }
  }

module.exports = router;
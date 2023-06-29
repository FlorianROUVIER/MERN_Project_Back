const express = require('express');
const router = express.Router();
const Products = require('../../models/Product');


router.get('/', (req, res) => {
  Products.find()
      .then(product => res.json(product))
      .catch(err => res.status(404).json({err: 'nope'}))
});


router.get('/products', (req, res) => {
    res.send('Produits');
});


router.get('/cart', (req, res) => {
  res.send('Panier');
});

module.exports = router;

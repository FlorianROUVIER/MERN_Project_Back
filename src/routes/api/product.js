const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Page d\'accueil');
});

router.get('/products', (req, res) => {
    res.send('Produits');
});


router.get('/cart', (req, res) => {
  res.send('Panier');
});

module.exports = router;

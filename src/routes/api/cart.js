const express = require('express');
const router = express.Router();

// Route pour afficher le panier de l'utilisateur
router.get('/', (req, res) => {
  const utilisateurId = req.user.id; 

  // Logique pour récupérer les produits du panier de l'utilisateur à l'aide de l'utilisateurId
  const produitsDuPanier = 3;

  res.json(produitsDuPanier);
});

module.exports = router;


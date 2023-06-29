const express = require('express');
const router = express.Router();
const Products = require('../../models/Product');


router.get('/', (req, res) => {
  Products.find()
      .then(product => res.json(product))
      .catch(err => res.status(404).json({err: 'nope'}))
});

router.post('/adminProduit', async (req, res) => {
  const { title, image, description, price, size, quantity, sport } = req.body;
   const product = new Products({
    title,
    image,
    description,
    price,
    size,
    quantity,
    sport
   });
   console.log(req.body)
   try {
     const newProduct = await product.save();
     res.status(201).json(newProduct);
   } catch (err) {
     res.status(400).json({ message: err.message });
   }
 });


router.get(':name', async (req, res) => {
  try{
    const name = req.params.name
    const product = await Products.find(name);
    console.log(product)
    if (product == null) { 
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch(err) {
    res.status(500).json({ error: 'Internal sedrver error' });
  }
});

module.exports = router;

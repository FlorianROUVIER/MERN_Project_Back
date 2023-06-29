const express = require('express');
const router = express.Router();
const Products = require('../../models/Product');


router.get('/', (req, res) => {
  Products.find()
      .then(product => res.json(product))
      .catch(err => res.status(404).json({err: 'nope'}))
});

router.post('/adminProduit', async (req, res) => {
  const { title, image, description, prix, height, quantity, sport } = req.body;
   const product = new Products({
    title,
    image,
    description,
    prix,
    height,
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


// router.get('/products', (req, res) => {
//     res.send('Produits');
// });


// router.get('/cart', (req, res) => {
//   res.send('Panier');
// });

module.exports = router;

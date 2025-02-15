const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


const productsController = require('../controllers/products');
const auth = require('../middleware/auth');
// const auth = require('../middleware/auth');

router.post('/create', auth, productsController.createProduct);

//   router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const Product = new Product({
//       ...req.body
//     });
//     Product.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// router.use('/', (req, res, next) => {
//     const stuff = [
//       {
//         _id: 'oeihfzeoi',
//         title: 'Mon premier objet',
//         description: 'Les infos de mon premier objet',
//         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//         price: 4900,
//         userId: 'qsomihvqios',
//       },
//       {
//         _id: 'oeihfzeomoihi',
//         title: 'Mon deuxième objet',
//         description: 'Les infos de mon deuxième objet',
//         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//         price: 2900,
//         userId: 'qsomihvqios',
//       },
//     ];
//     res.status(200).json(stuff);
//   });
router.post('/get', productsController.getAllProducts);

// router.get('/:id', productsController.getOneProduct);
router.put('/update', auth, productsController.modifyProduct );

router.delete('/delete', auth, productsController.deleteProduct);

module.exports = router;
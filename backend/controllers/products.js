const Product = require('../models/Product');

exports.createProduct = (req, res, next) => {
    // delete req.body._id;
//     const Product = new Product({
//       ...req.body
//     });
//     Product.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });
// test
  const product = new Product({
    nom: req.body.name,
    description: req.body.description,
    image: req.body.picture,
    prix: req.body.price,
    stock: req.body.stock
  });
// fin test
// const product = new Product({
    //     nom: "ret",
    //     // description: req.body.description,
    //     // imageUrl: req.body.imageUrl,
    //     prix: 1,
    //     stock: 5
    //   });
  product.save().then(
    () => {
      res.status(201).json({
        message: 'Produit enregistré avec succès'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// exports.getOneProduct = (req, res, next) => {
//   Product.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// };

const mongoose = require('mongoose');

exports.modifyProduct = (req, res, next) => {
    // Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    // Product.updateOne({ _id: req.body._id }, { ...req.body, _id: req.body._id })
    //   .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    //   .catch(error => res.status(400).json({ error }));
    
    const productToUpdate = {

      nom: req.body.name,
      description: req.body.description,
      image: req.body.picture,
      prix: req.body.price,
      stock: req.body.stock
    };    


    Product.findByIdAndUpdate(
      req.body._id, 
      productToUpdate, 
      { new: true, runValidators: true }
  ).then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.deleteProduct = (req, res, next) => {
    // Product.deleteOne({ _id: req.params.id })
    console.log('ok');
    Product.deleteOne({ _id: req.body._id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

  // const User = require('../models/User');

  // exports.getAllProducts = (req, res, next) => {
  exports.getAllProducts = async (req, res, next) => {
    // console.log(req.body.page);
      // Product.find()
      //   .then(things => res.status(200).json(things))
      //   .catch(error => res.status(400).json({ error }));
      try {
        // pagination
        const page = parseInt(req.body.page);
        const limit = parseInt(req.body.limit);
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments(); // Nombre total de produits

        res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            products: products
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
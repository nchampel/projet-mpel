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
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
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

exports.getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyProduct = (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getAllProducts = (req, res, next) => {
      Product.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
    };
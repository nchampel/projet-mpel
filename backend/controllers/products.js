const yup = require("yup");

const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    // delete req.body._id;
//     const Product = new Product({
//       ...req.body
//     });
//     Product.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

const schema = yup.object({
  name: yup.string().min(3, "Le nom doit contenir au moins 3 caractères").required("Nom requis"),
  description: yup.string(),
  picture: yup.string().url("L'URL est invalide"),
  price: yup.number().min(1, "Le prix doit être supérieur à 0").required("Prix requis"),
  stock: yup.number().min(0, "Le prix doit être supérieur à 0").required("Stock requis"),
});

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
    await schema.validate(req.body, { abortEarly: false });

  product.validate().then(() => {

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
  });
};

// exports.getOneProduct = (req, res, next) => {
//   Product.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// };

// const mongoose = require('mongoose');

exports.modifyProduct = async (req, res, next) => {
    // Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    // Product.updateOne({ _id: req.body._id }, { ...req.body, _id: req.body._id })
    //   .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    //   .catch(error => res.status(400).json({ error }));

    const schema = yup.object({
      name: yup.string().min(3, "Le nom doit contenir au moins 3 caractères").required("Nom requis"),
      description: yup.string(),
      picture: yup.string().url("L'URL est invalide"),
      price: yup.number().min(1, "Le prix doit être supérieur à 0").required("Prix requis"),
      stock: yup.number().min(0, "Le prix doit être supérieur à 0").required("Stock requis"),
    });
    
    const productToUpdate = {

      nom: req.body.name,
      description: req.body.description,
      image: req.body.picture,
      prix: req.body.price,
      stock: req.body.stock
    };    

    await schema.validate(req.body, { abortEarly: false });


    Product.findByIdAndUpdate(
      req.body._id, 
      productToUpdate, 
      { new: true, runValidators: true }
  ).then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.deleteProduct = (req, res, next) => {
    // Product.deleteOne({ _id: req.params.id })
    // const page = parseInt(req.body.page);
    // const limit = parseInt(req.body.limit);
    // const totalProducts = parseInt(req.body.totalProducts);
    // const totalPages = parseInt(req.body.totalPages);
    
    Product.deleteOne({ _id: req.body._id })
      .then(
        () => {
          // totalProducts--;
          // if(totalProducts !== 0) {
          //   totalPages = Math.ceil(totalProducts / limit) === totalPages ? totalPages : Math.ceil(totalProducts / limit);
          // }
          res.status(200).json({ 
            message: 'Objet supprimé !',
            // totalPages,
            // n° de page
          });
        })
      .catch(error => res.status(400).json({ error }));
      
    // const total = await Product.countDocuments(); // Nombre total de produits

    

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
        const totalProducts = await Product.countDocuments(); // Nombre total de produits

        res.json({
            // page,
            // limit,
            // totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            products: products
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    };
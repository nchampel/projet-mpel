const yup = require("yup");
const winston = require("winston");

const Product = require("../models/Product");

const date = new Date();

const year = date.getFullYear().toString();
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");
const seconds = date.getSeconds().toString().padStart(2, "0");

const logStart = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `logs/${year}/${month}/${year}_${month}_${day}.log`,
    }),
  ],
});

exports.createProduct = async (req, res, next) => {
  const schema = yup.object({
    name: yup
      .string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .required("Nom requis"),
    description: yup.string(),
    picture: yup.string().url("L'URL est invalide"),
    price: yup
      .number()
      .min(1, "Le prix doit être supérieur à 0")
      .required("Prix requis"),
    stock: yup
      .number()
      .min(0, "Le prix doit être supérieur à 0")
      .required("Stock requis"),
  });

  const product = new Product({
    nom: req.body.name,
    description: req.body.description,
    image: req.body.picture,
    prix: req.body.price,
    stock: req.body.stock,
  });
  await schema.validate(req.body, { abortEarly: false });

  product.validate().then(() => {
    product
      .save()
      .then(() => {
        logger.info(
          `${req.method} ${req.url} ${logStart} classe createProduct : Le produit a été créé`
        );
        res.status(201).json({
          message: "Produit enregistré avec succès",
        });
      })
      .catch((error) => {
        logger.error(
          `${req.method} ${req.url} ${logStart} classe createProduct : Le produit n'a pas été créé. Erreur : ${err.message}`
        );
        res.status(400).json({
          error: error,
        });
      });
  });
};

exports.modifyProduct = async (req, res, next) => {
  const schema = yup.object({
    name: yup
      .string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .required("Nom requis"),
    description: yup.string(),
    picture: yup.string().url("L'URL est invalide"),
    price: yup
      .number()
      .min(1, "Le prix doit être supérieur à 0")
      .required("Prix requis"),
    stock: yup
      .number()
      .min(0, "Le prix doit être supérieur à 0")
      .required("Stock requis"),
  });

  const productToUpdate = {
    nom: req.body.name,
    description: req.body.description,
    image: req.body.picture,
    prix: req.body.price,
    stock: req.body.stock,
  };

  await schema.validate(req.body, { abortEarly: false });

  Product.findByIdAndUpdate(req.body._id, productToUpdate, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      logger.info(
        `${req.method} ${req.url} ${logStart} classe modifyProduct : Le produit ${req.body.name} a été modifié`
      );
      res.status(200).json({ message: "Objet modifié !" });
    })
    .catch((error) => {
      logger.error(
        `${req.method} ${req.url} ${logStart} classe modifyProduct : Le produit n'a pas été modifié. Erreur : ${err.message}`
      );
      res.status(400).json({ error });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productName = req.body.productName;

  Product.deleteOne({ _id: req.body._id })
    .then(() => {
      logger.info(
        `${req.method} ${req.url} ${logStart} classe deleteOne : Le produit ${productName} a été supprimé`
      );
      res.status(200).json({
        message: "Objet supprimé !",
      });
    })
    .catch((error) => {
      logger.error(
        `${req.method} ${req.url} ${logStart} classe deleteOne : Le produit n'a pas été supprimé. Erreur : ${err.message}`
      );
      res.status(400).json({ error });
    });
};

exports.getAllProducts = async (req, res, next) => {
  try {
    // pagination
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(); // Nombre total de produits

    logger.info(
      `${req.method} ${req.url} ${logStart} classe getAllProducts : Les produits ont bien été récupérés`
    );
    res.json({
      totalPages: Math.ceil(totalProducts / limit),
      products: products,
    });
  } catch (err) {
    logger.error(
      `${req.method} ${req.url} ${logStart} classe getAllProducts : Les produits n'ont pas été récupérés. Erreur : ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
};

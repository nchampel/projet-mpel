const User = require("../models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const winston = require("winston");
const yup = require("yup");

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

exports.signup = async (req, res, next) => {
  const schema = yup.object({
    email: yup
      .string()
      .email("Vous devez saisir un email")
      .required("Email requis"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
  });

  await schema.validate(req.body, { abortEarly: false });

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .validate()
      .then(() => {
        user
          .save()
          .then(() => {
            logger.info(
              `${req.method} ${req.url} ${logStart} classe signup : L'utilisateur ${req.body.email} a été créé`
            );
            res.status(201).json({ message: "Utilisateur créé !" });
          })
          .catch((error) => {
            logger.error(
              `${req.method} ${req.url} ${logStart} classe signup : L'utilisateur n'a pas été créé. Erreur : ${error.message}`
            );
            res.status(400).json({ error });
          });
      })
      .catch((error) => {
        logger.error(
          `${req.method} ${req.url} ${logStart} classe signup : L'utilisateur n'a pas été créé. Erreur : ${error.message}`
        );
        res.status(500).json({ error });
      });
  });
};

exports.login = async (req, res, next) => {
  const schema = yup.object({
    email: yup
      .string()
      .email("Vous devez saisir un email")
      .required("Email requis"),
    password: yup
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Mot de passe requis"),
  });

  await schema.validate(req.body, { abortEarly: false });

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        logger.error(
          `${req.method} ${req.url} ${logStart} classe login : L'utilisateur n'a pas été trouvé`
        );
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            logger.error(
              `${req.method} ${req.url} ${logStart} classe login : Mot de passe incorrect`
            );
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          logger.info(
            `${req.method} ${req.url} ${logStart} classe login : L'utilisateur est connecté'`
          );
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "eRtgYHju@1524FGtrX", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          logger.error(
            `${req.method} ${req.url} ${logStart} classe login : L'utilisateur n'a pas été vérifié. Erreur : ${error.message}`
          );
          res.status(500).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.checkAuth = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    logger.error(
      `${req.method} ${req.url} ${logStart} classe checkAuth : Aucun token d'authentification`
    );
    return res
      .status(401)
      .json({ message: "Aucun token d'authentification !" });
  }

  try {
    const decodedToken = jwt.verify(token, "eRtgYHju@1524FGtrX");

    const userDB = await User.findById(decodedToken.userId);

    const user = userDB._id;

    if (!user) {
      logger.error(
        `${req.method} ${req.url} ${logStart} classe checkAuth : L'utilisateur n'a pas été trouvé`
      );
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    logger.info(
      `${req.method} ${req.url} ${logStart} classe checkAuth : L'utilisateur a été vérifié'`
    );
    return res.status(200).json({ user });
  } catch (error) {
    logger.error(
      `${req.method} ${req.url} ${logStart} classe checkAuth : Token invalide ou expiré. Erreur : ${error.message}`
    );
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

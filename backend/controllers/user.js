const User = require("../models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
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
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "eRtgYHju@1524FGtrX", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.checkAuth = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Aucun token d'authentification" });
  }

  try {
    // 2. Vérifier et décoder le token JWT
    const decodedToken = jwt.verify(token, "eRtgYHju@1524FGtrX");

    // 3. Trouver l'utilisateur par son ID
    const userDB = await User.findById(decodedToken.userId);

    const user = userDB._id;

    // 4. Si l'utilisateur n'est pas trouvé
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // 5. Si tout est bon, renvoyer l'utilisateur
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

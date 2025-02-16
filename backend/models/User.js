const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email invalide"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Le mot de passe doit contenir au moins 8 caractères"],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

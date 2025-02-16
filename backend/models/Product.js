const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  prix: {
    type: Number,
    required: true,
    min: [1, "Le prix doit être supérieur à 0"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Le stock doit être supérieur ou égal à 0"],
  },
});

module.exports = mongoose.model("Product", productSchema);

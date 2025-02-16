const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const productsController = require("../controllers/products");
const auth = require("../middleware/auth");

router.post("/create", auth, productsController.createProduct);

router.post("/get", productsController.getAllProducts);

router.put("/update", auth, productsController.modifyProduct);

router.delete("/delete", auth, productsController.deleteProduct);

module.exports = router;

const express = require("express");
let router = express.Router();
const Joi = require("joi");
const validateProduct = require("../../middleware/validateProduct");
var { Product } = require("../../models/products");

router.get("/", async (req, res) => {
  let pageNumber = Number(req.query.pageNumber ? req.query.pageNumber : 1);
  let perPageLimit = Number(
    req.query.perPageLimit ? req.query.perPageLimit : 10
  );
  let skipRecords = (pageNumber - 1) * perPageLimit;
  let products = await Product.find().skip(skipRecords).limit(perPageLimit);
  return res.send(products);
});
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("product with this id is not present in db");
    return res.send(product);
  } catch (err) {
    return res.status(400).send("Invalid Response");
  }
});
router.put("/:id", validateProduct, async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});
router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});
router.post("/", validateProduct, async (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.send(product);
});
module.exports = router;

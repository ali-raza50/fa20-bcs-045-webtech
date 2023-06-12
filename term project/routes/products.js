var express = require("express");
var router = express.Router();
var navbarModel = require("../Models/navbar");
var menModel = require("../Models/menCollection");
var womenModel = require("../Models/womenCollection");
var jwelleryModel = require("../Models/jwellery");
var checkSessionAuth = require("../middleware/checksessionAuth");
const multer = require("multer");
const { add } = require("lodash");
const { route } = require(".");
const admin = require("../middleware/admin");
let storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({
  storage: storage,
});
router.get("/", async function (req, res, next) {
  let navbar = await navbarModel.findById("647c2ee92fea12b463799a5d");
  let menCollection = await menModel.find();
  let womenCollection = await womenModel.find();
  let jwelleryCollection = await jwelleryModel.find();

  res.render("home", {
    navbar,
    menCollection,
    womenCollection,
    jwelleryCollection,
  });
});

router.get("/admin", checkSessionAuth, admin, async function (req, res, next) {
  let products = await menModel.find();
  let womenCollection = await womenModel.find();
  let jwelleryCollection = await jwelleryModel.find();
  res.render("products/list", {
    title: "Total Items Available ",
    products,
    womenCollection,
    jwelleryCollection,
  });
});

router.get("/add", async function (req, res, next) {
  res.render("products/add");
});
router.post("/add", upload.single("image"), async function (req, res, next) {
  console.log(req.body.category);
  // Retrieve form fields from req.body
  const { name, price, description, qty } = req.body;
  let category = req.body.category;
  let product;
  if (category === "men") {
    product = new menModel({
      name,
      price,
      description,
      qty,
      imgUrl: req.file.filename,
    });
  } else if (category === "women") {
    product = new womenModel({
      name,
      price,
      description,
      qty,
      imgUrl: req.file.filename,
    });
  } else if (category === "jewellery") {
    product = new jwelleryModel({
      name,
      price,
      description,
      qty,
      imgUrl: req.file.filename,
    });
  } else {
    // Handle the case when an invalid category value is submitted
    return res.status(400).send("Invalid category");
  }

  await product.save();

  res.redirect("/admin");
});
router.get("/delete/:id", async function (req, res, next) {
  const productId = req.params.id;

  // Delete the document from the menCollection
  await menModel.findByIdAndDelete(productId);

  // Delete the document from the womenCollection
  await womenModel.findByIdAndDelete(productId);

  // Delete the document from the jwelleryCollection
  await jwelleryModel.findByIdAndDelete(productId);

  res.redirect("/admin");
});
router.get("/cart/:id", async function (req, res, next) {
  let productId = req.params.id;
  let product = null;
  product = await menModel.findById(productId);
  if (product) {
    addtoCart(product);
    product.qty--;
    await product.save();
    return res.redirect("/cart");
  }
  product = await womenModel.findById(productId);
  if (product) {
    addtoCart(product);
    product.qty--;
    await product.save();
    return res.redirect("/cart");
  }
  product = await jwelleryModel.findById(productId);
  if (product) {
    addtoCart(product);
    product.qty--;
    await product.save();
    return res.redirect("/cart");
  }

  function addtoCart(product) {
    let cart = [];
    if (req.cookies.cart) cart = req.cookies.cart;

    cart.push(product);
    res.cookie("cart", cart);
  }
});
router.post("/cart/:id", async function (req, res, next) {
  let product = await menModel.findById(req.params.id);

  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  console.log(req.cookies.cart);
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});

router.get("/edit/:id", async function (req, res, next) {
  const productId = req.params.id;

  let product = await womenModel.findById(productId);

  if (!product) {
    product = await menModel.findById(productId);
  }

  if (!product) {
    product = await jwelleryModel.findById(productId);
  }

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.render("products/edit", { product });
});

router.post("/edit/:id", async function (req, res, next) {
  const productId = req.params.id;

  let product = await womenModel.findById(productId);

  if (!product) {
    product = await menModel.findById(productId);
  }

  if (!product) {
    product = await jwelleryModel.findById(productId);
  }

  if (!product) {
    return res.status(404).send("Product not found");
  }

  console.log(req.body.name);

  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.qty = req.body.qty;
  await product.save();
  res.redirect("/admin");
});
router.get("/about", function (req, res) {
  res.render("about");
});
router.get("/contact", function (req, res) {
  res.render("contact");
});

module.exports = router;

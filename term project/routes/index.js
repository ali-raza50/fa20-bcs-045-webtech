var express = require("express");
var router = express.Router();

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  console.log("cart array is in index");
  // console.log(cart);

  if (!cart) cart = [];
  // console.log(cart.length);
  res.render("cart", { cart });
});

module.exports = router;

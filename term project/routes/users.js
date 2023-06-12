var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
var User = require("../Models/user");
let sessionAuth = require("../middleware/sessionAuth");
const admin = require("../middleware/admin");

let checkSessionAuth = require("../middleware/checksessionAuth");

router.get("/register", function (req, res, next) {
  res.render("users/register");
});
router.post("/register", async function (req, res, next) {
  let userObj = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  res.redirect("/");
});
router.get("/login", function (req, res, next) {
  res.render("users/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    let role1 = req.session.user;
    // console.log("login h");
    // console.log(role1.password);
    // console.log(req.session.user.role);

    // req.flash("dummy", "Login successful");
    if (role1.role === "admin") {
      return res.redirect("/admin");
    }
    return res.redirect("/");
  } else {
    // Set flash message
    // req.flash("error", "Invalid credentials");
    return res.redirect("/login");
  }
});
router.get("/logout", function (req, res, next) {
  // Set flash message
  // req.flash("success", "Logout successful");

  req.session.user = null;
  res.redirect("/login");
});

module.exports = router;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var productRouter = require("./routes/products");
var usersRouter = require("./routes/users");
var session = require("express-session");
var sessionAuth = require("./middleware/sessionAuth");
var checkSession = require("./middleware/checksessionAuth");
var admin = require("./middleware/admin");
var navbarSchema = require("./Models/navbar");
var menSchema = require("./Models/menCollection");
var womenSchema = require("./Models/womenCollection");
var jwellerySchema = require("./Models/jwellery");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
// const flash = require("express-flash");
const flash = require("connect-flash");
// const flashs = require("./middleware/flash");
var app = express();
// Configure session middleware
app.use(
  session({
    secret: "dummy",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(sessionAuth);
// app.use(admin);
// app.use(checkSession)

// // app.use((req, res, next) => {
// //   res.locals.successFlash = req.flash("success");
// //   res.locals.errorFlash = req.flash("error");
// //   next();
// // });
// app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));

app.use("/", indexRouter);
app.use("/", productRouter);
app.use("/", usersRouter);

mongoose
  .connect("mongodb://0.0.0.0:27017/termProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB success.");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

module.exports = app;

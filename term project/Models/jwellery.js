var mongoose = require("mongoose");

var jwellerySchema = mongoose.Schema({
  imgUrl: String,
  name: String,
  price: Number,
  description: String,
  buttonName: String,
  qty: Number,
});
const jwellery = mongoose.model("JwelleryCollection", jwellerySchema);
module.exports = jwellery;

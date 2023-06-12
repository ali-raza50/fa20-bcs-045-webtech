var mongoose = require("mongoose");

var womenSchema = mongoose.Schema({
  imgUrl: String,
  name: String,
  price: Number,
  description: String,
  buttonName: String,
  qty: Number,
});
const women = mongoose.model("WomenCollection", womenSchema);
module.exports = women;

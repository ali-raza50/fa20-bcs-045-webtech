var mongoose = require("mongoose");

var menSchema = mongoose.Schema({
  imgUrl: String,
  name: String,
  price: Number,
  description: String,
  buttonName: String,
  qty: Number,
  rating: Number,
});
const men = mongoose.model("MenCollection", menSchema);
module.exports = men;

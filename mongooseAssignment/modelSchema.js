const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: Number,
});

const UserModel = mongoose.model("user", userSchema);

const productSchema = mongoose.Schema({
  name: String,
  color: String,
  brand: String,
  quantity: Number,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  UserModel,
  ProductModel,
};

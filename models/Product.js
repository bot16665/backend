const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Men", "Women"] },
  thumbnails: { type: [String], required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

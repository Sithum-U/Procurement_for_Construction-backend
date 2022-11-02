const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const CartItems = mongoose.model("CartItems", cartItemsSchema);
module.exports = CartItems;

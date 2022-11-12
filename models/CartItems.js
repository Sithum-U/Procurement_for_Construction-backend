const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  // quantity: {
  //   type: Number,
  // },
  // total: {
  //   type: Number,
  // },
  orderItems: [
    {
      name: { type: String, required: false },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  totalPrice: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isApproved: { type: Boolean, default: false },
  small_id: { type: String, required: true },
  approvedAt: { type: Date },
},
  {
    timestamps: true,
  }
);

const CartItems = mongoose.model("CartItems", cartItemsSchema);
module.exports = CartItems;

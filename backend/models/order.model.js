const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    purchaser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ['month', 'year'],
      required: true,
    },
    // status: {
    //   type: Number,
    //   required: true,
    //   enum: [
    //     1, // ongoing
    //     2, // expired
    //   ]
    // }
  }, { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
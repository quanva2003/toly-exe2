const asyncHandler = require("express-async-handler");
const PayOS = require("@payos/node");
const User = require("../models/user.model.js");
const Order = require("../models/order.model.js");

const getOrderList = asyncHandler(async (req, res) => {
  const { _id: currentUser } = req.user;

  try {
    const orderList = await Order.find({ purchaser: currentUser }).populate('purchaser', 'name email pic');

    if (!orderList) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orderList);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
})

const purchaseOrder = asyncHandler(async (req, res) => {
  const { _id: currentUser } = req.user;
  const { type } = req.body;

  try {
    await User.findByIdAndUpdate(currentUser, { accountType: type });

    const order = await Order.create({
      purchaser: currentUser,
      type: req.params.id,
    })

    res.status(200).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
})

//----------TEST-------------
const payos = new PayOS('client_id', 'api-key', 'checksum-key');

const buyPremium = asyncHandler(async (req, res) => {
  try {
    const order = {
      ammount: 0,
      description: "Mua gi do",
      orderCode: 10,
      returnUrl: "http://localhost:3000",
      cancelUrl: "http://localhost:3000"
    };

    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl());
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = { getOrderList, purchaseOrder, buyPremium };
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
const payOS = new PayOS(
  'b3ceb827-00af-4af8-bc55-1b02281df434',
  '7964573e-1cd8-4790-9b99-dbcf8bf9bef4',
  'a1803813477cfdedff4b8dc761e015e885f1ee79945052b80304c7d9e734eb3b'
);

const YOUR_DOMAIN = "http://localhost:3000";

const buyPremium = asyncHandler(async (req, res) => {
  try {
    const { amount, description, type } = req.body;
    const { _id: currentUser } = req.user;

    if (!amount || !description) {
      return res
        .status(400)
        .json({ error: "Amount and description are required." });
    }

    const order = {
      amount: amount,
      description: description,
      orderCode: Date.now(),
      returnUrl: `${YOUR_DOMAIN}/successPay`,
      cancelUrl: `${YOUR_DOMAIN}/failPay`,
    };

    const paymentLink = await payOS.createPaymentLink(order);
    await User.findByIdAndUpdate(currentUser, { accountType: type });
    await Order.create({
      purchaser: currentUser,
      type: type,
    })
    res.json({ checkoutUrl: paymentLink.checkoutUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create payment link" });
  }
});

const cancelPremium = asyncHandler(async (req, res) => {
  const orderCode = req.body.orderCode; // assuming you pass the orderCode in the request body
  try {
    const cancellationResult = await payOS.cancelPaymentLink(orderCode);
    res.json({ result: cancellationResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel payment link" });
  }
});

const getPaymentInfo = asyncHandler(async (req, res) => {
  const order = req.params.id;
  try {
    const paymentInfo = await payOS.getPaymentLinkInformation(order);
    res.status(200).json(paymentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get payment link info" });
  }
});

module.exports = { getOrderList, purchaseOrder, buyPremium, cancelPremium, getPaymentInfo };
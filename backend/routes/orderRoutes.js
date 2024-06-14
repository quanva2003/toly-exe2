const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getOrderList,
  purchaseOrder,
  buyPremium,
  cancelPremium,
  getPaymentInfo,
  getAllOrders,
} = require("../controllers/orderControllers");

const router = express.Router();

router.route("/all-orders").get(protect, getAllOrders);

router.route("/order-history").get(protect, getOrderList);

router.route("/purchase").get(protect, purchaseOrder);

router.route("/create-payment-link").post(protect, buyPremium);

router.route("/cancel-payment-link").post(protect, cancelPremium);

router.route("/get-payment-link-info/:id").get(getPaymentInfo);

module.exports = router;

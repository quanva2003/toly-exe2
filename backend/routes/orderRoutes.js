const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getOrderList, purchaseOrder, buyPremium } = require("../controllers/orderControllers");

const router = express.Router();

router.route("/order-history").get(protect, getOrderList);

router.route("/purchase").get(protect, purchaseOrder);

router.route("/create-payment-link").post(protect, buyPremium);

module.exports = router;
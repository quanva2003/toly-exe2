const express = require("express");
const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
} = require("../controllers/friendControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:id").post(protect, sendFriendRequest);

router.route("/:id").patch(protect, acceptFriendRequest);

router.route("/:id").patch(protect, declineFriendRequest,);

module.exports = router;

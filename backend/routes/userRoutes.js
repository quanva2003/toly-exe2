const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  logoutUser,
  updateUserPassword,
  getUserById,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/signup").post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/password").put(updateUserPassword);
router.get("/:id", protect, getUserById);
module.exports = router;

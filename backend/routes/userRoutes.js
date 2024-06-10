const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  logoutUser,
  updateUserPassword,
  getUserById,
  getUserByName,
  removeUser,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/:id").get(protect, getUserById);
router.route("/signup").post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/password").put(updateUserPassword);
router.route("/name/:name").get(protect, getUserByName);
router.route("/:id").delete(protect, removeUser);

module.exports = router;

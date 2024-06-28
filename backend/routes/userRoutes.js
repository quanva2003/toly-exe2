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
  uploadAvatar,
  uploadBackground,
  verifyEmail,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/:id").get(protect, getUserById);
router.route("/signup").post(registerUser);
router.route("/verify-email/:token").get(verifyEmail);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/password").put(updateUserPassword);
router.route("/name/:name").get(protect, getUserByName);
router.route("/:id").delete(protect, removeUser);
router.route("/upload-avatar").patch(protect, uploadAvatar);
router.route("/upload-cover").patch(protect, uploadBackground);

module.exports = router;

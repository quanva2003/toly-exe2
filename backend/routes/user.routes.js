import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { AcceptFriendRequest, DeclineFriendRequest, FriendRequestList, SendFriendRequest, getFriendList, getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

router.get("/accept-friend/:userId", protectRoute, getFriendList);

router.get("/friend-request/:userId", protectRoute, FriendRequestList);

router.post("/friend-request", protectRoute, SendFriendRequest);

router.post("/friend-request/accept", protectRoute, AcceptFriendRequest);

// router.post("friend-request/decline", protectRoute, DeclineFriendRequest);

export default router;

const asyncHandler = require("express-async-handler");
const Friend = require("../models/friend.model");
const User = require("../models/friend.model");

const sendFriendRequest = asyncHandler(async (req, res) => {

  var friendRequest = {
    requester: req.user._id,
    recipient: req.params.id,
    status: 1,
  };

  try {
    var friend = await Friend.create(friendRequest);
    friend = await friend.populate("requester", "name pic");
    friend = await friend.populate("recipient", "name pic");

    res.json(friend);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const friend = await Friend.findOneAndUpdate();

  try {

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const declineFriendRequest = asyncHandler(async (req, res) => {
  const friend = await Friend.findOneAndUpdate();
  try {

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendFriendRequest, acceptFriendRequest, declineFriendRequest };
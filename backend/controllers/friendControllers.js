const asyncHandler = require("express-async-handler");
const Friend = require("../models/friend.model.js");
const User = require("../models/user.model.js");

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
  try {
    const friend = await Friend.findByIdAndUpdate({ requester: req.params.id }, { status: 2 });
    const newFriend = await User.findByIdAndUpdate(req.user._id, { friends: friend });
    res.status(200).json(newFriend);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const declineFriendRequest = asyncHandler(async (req, res) => {
  try {
    const friend = await Friend.findByIdAndUpdate(req.params._id, { status: 3 });
    res.status(200).json(friend);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendFriendRequest, acceptFriendRequest, declineFriendRequest };
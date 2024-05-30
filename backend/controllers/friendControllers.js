const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Friend = require("../models/friend.model.js");
const User = require("../models/user.model.js");

const getAllFriend = asyncHandler(async (req, res) => {
  const { _id: currentUser } = req.user;

  try {
    const friend = await User.findById(currentUser).populate('friends', 'name pic email');

    if (!friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(friend);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const sendFriendRequest = asyncHandler(async (req, res) => {
  const { _id: requesterId } = req.user;
  const { id: recipientId } = req.params;

  try {
    // Check if a friend request already exists
    const existingFriendRequest = await Friend.findOne({
      requester: requesterId,
      recipient: recipientId,
      status: { $in: [1, 2] },
    });

    if (existingFriendRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // Create a new friend request
    const friendRequest = {
      requester: requesterId,
      recipient: recipientId,
      status: 1,
    };

    let friend = await Friend.create(friendRequest);

    // Populate requester and recipient fields
    friend = await friend.populate("requester", "name pic");
    friend = await friend.populate("recipient", "name pic");

    res.status(201).json(friend);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: requesterId } = req.params;
    const { _id: userId } = req.user;

    // Update the friend request status
    const friend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: userId, status: 1 }, // Assuming status 1 means pending
      { status: 2 }, // Assuming status 2 means accepted
      { new: true, session }
    );

    if (!friend) {
      throw new Error('Friend request not found or already accepted.');
    }

    // Add each user to the other's friends list
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: requesterId } },
      { new: true, session }
    );

    const requesterUpdate = await User.findByIdAndUpdate(
      requesterId,
      { $addToSet: { friends: userId } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ user: userUpdate, requester: requesterUpdate });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

const declineFriendRequest = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id: requesterId } = req.params;
    const { _id: userId } = req.user;

    // Update the friend request status
    const friend = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: userId, status: 1 }, // Assuming status 1 means pending
      { status: 3 }, // Assuming status 3 means declined
      { new: true, session }
    );

    if (!friend) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Friend request not found' });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(friend);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = { getAllFriend, sendFriendRequest, acceptFriendRequest, declineFriendRequest };
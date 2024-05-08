import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFriendList = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.error("Error in getFriendList: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const FriendRequestList = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("friendRequests", "name email image")
      .lean();

    const friendRequests = user.friendRequests;

    res.status(200).json(friendRequests);
  } catch (error) {
    console.error("Error in getFriendRequestList: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const SendFriendRequest = async (req, res) => {
  try {
    //update the recepient's friendRequestsArray!
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    console.error("Error in SendFriendRequest: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const AcceptFriendRequest = async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    //retrieve the documents of sender and the recipient
    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.friendRequests = recepient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.error("Error in AcceptFriendRequest: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

export const DeclineFriendRequest = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in DeclineFriendRequest: ", error.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

import React, { useEffect, useState } from "react";
import "./FriendList.css";
import { Button, Dropdown, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

interface FriendsListProps {
  setFriendsOnMap: (friends: any) => void;
}

const FriendsList = ({ setFriendsOnMap }: FriendsListProps) => {
  const { user } = ChatState();
  console.log(user._id);

  const [friends, setFriends] = useState<any>([]);

  const items: MenuProps["items"] = [
    {
      label: <a href="https://www.antgroup.com">View Profile</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">Delete</a>,
      key: "1",
    },
  ];

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/friend", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response.data);

        const friendData = response.data.filter(
          (friend) => friend.requester === user._id
        );
        console.log(friendData);

        const friendsInfo = await Promise.all(
          friendData.map(async (friend) => {
            try {
              const res = await axios.get(
                `http://localhost:5000/api/user/${friend.recipient._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.token}`,
                  },
                }
              );
              console.log(res.data);
              return res.data;
            } catch (error) {
              console.error(
                `Error fetching data for friend ID ${friend.recipient}: `,
                error.message
              );
            }
          })
        );

        setFriends(friendsInfo);
        setFriendsOnMap(friendsInfo);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    fetchFriend();
  }, [user, setFriendsOnMap]);

  return (
    <ul className="friends-list">
      {friends.map((friend: any, index: number) => (
        <li key={index} className="friend-item">
          <div className="friend-detail">
            <img
              src="https://i.pinimg.com/564x/ea/56/d8/ea56d8b90e525b069de9448d473da337.jpg"
              // src={friend.pic}
              alt="Profile"
              className="friend-image"
            />
            <div className="friend-info">
              <p className="friend-name">{friend.name}</p>
              <p className="friend-mutuals">Number of mutual friends</p>
            </div>
          </div>
          <div className="friend-action">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button icon={<MoreOutlined />} />
              </a>
            </Dropdown>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FriendsList;

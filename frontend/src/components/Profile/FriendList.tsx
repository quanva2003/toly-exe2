import React from "react";
import "./FriendList.css";
import { Button, Dropdown, MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const FriendsList = () => {
  const friends = [
    "Friend1",
    "Friend2",
    "Friend3",
    "Friend4",
    "Friend5",
    "Friend6",
    "Friend7",
    "Friend8",
    "Friend9",
    "Friend10",
  ];
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
  return (
    <ul className="friends-list">
      {friends.map((friend, index) => (
        <li key={index} className="friend-item">
          <div className="friend-detail">
            <img
              src="https://i.pinimg.com/564x/ea/56/d8/ea56d8b90e525b069de9448d473da337.jpg"
              alt="Profile"
              className="friend-image"
            />
            <div className="friend-info">
              <p className="friend-name">{friend}</p>
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

import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Button, Tabs } from "antd";
import { EditFilled } from "@ant-design/icons";
import FriendList from "./FriendList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

interface UserProfileProps {
  _id: string;
  name: string;
  pic: string;
  friends: string[];
}

const UserProfile: React.FC = () => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

  const { user } = ChatState();
  const { id } = useParams<{ id: string }>();

  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [id, user.token]);

  const avatarSize = Math.max(50, 200 - scrollPosition);
  const headerHeight = Math.max(50, 250 - scrollPosition);

  const items = [
    {
      key: "1",
      label: "Friends",
      children: <FriendList />,
    },
    {
      key: "2",
      label: "Fav Explore",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Contributed Explore",
      children: "Content of Tab Pane 3",
    },
  ];

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header" style={{ height: `${headerHeight}px` }}>
        <div className="profile-limited">
          <div className="profile-bg"></div>
          <div className="profile-info">
            <img
              src={userProfile.pic}
              alt={userProfile.name}
              className="avatar"
              style={{ height: `${avatarSize}px`, width: `${avatarSize}px` }}
            />
            <div className="user-detail">
              <div className="user-name">
                <h2>{userProfile.name}</h2>
                <p>{userProfile.friends.length} friends</p>
              </div>
              {/* {userInfo?._id === userProfile._id ? (
                <Button shape="circle" icon={<EditFilled />} />
              ) : (
                <Button>Add friend</Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-main">
        <Tabs defaultActiveKey="1" items={items} className="user-tab" />
      </div>
    </div>
  );
};

export default UserProfile;

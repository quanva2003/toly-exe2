import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Button, Tabs, TabsProps } from "antd";
import { EditFilled } from "@ant-design/icons";
import FriendsList from "./FriendList";
import { log } from "console";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

const UserProfile: React.FC = () => {
  const storedUserInfo = localStorage.getItem("userInfo");
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  console.log("current:", userInfo);
  const { user } = ChatState();
  const { id } = useParams<{ id: string }>(); // Extracting user ID from URL
  console.log(id);

  const [userProfile, setUserProfile] = useState<any>(null);
  const [numFriends, setNumFriends] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [friendsOnMap, setFriendsOnMap] = useState([]);
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
    setNumFriends(friendsOnMap.length);
  }, [friendsOnMap]);

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
        console.log("friend:", response.data);

        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [id, user.token]);
  const avatarSize = Math.max(50, 200 - scrollPosition);
  const headerHeight = Math.max(50, 250 - scrollPosition);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Friends",
      children: <FriendsList setFriendsOnMap={setFriendsOnMap} />,
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

  return (
    <div className="profile-container">
      <div
        className="profile-header"
        style={
          {
            // height: `${headerHeight}px`,
            // padding: scrollPosition ? "20px 0" : "0",
          }
        }
      >
        <div className="profile-limited">
          <div className="profile-bg"></div>
          <div
            className="profile-info"
            // style={{ flexDirection: scrollPosition > 50 ? "row" : "row" }}
          >
            <img
              src="https://i.pinimg.com/564x/4a/33/53/4a3353b603710dc3c36d9c3247493175.jpg"
              alt="Bramus"
              className="avatar"
              // style={{ height: `${avatarSize}px`, width: `${avatarSize}px` }}
            />
            <div
              className="user-detail"
              // style={{ flexDirection: scrollPosition > 50 ? "row" : "column" }}
            >
              <div className="user-name">
                <h2>{userProfile?.name}</h2>
                <p>{numFriends} friends</p>
              </div>
              {/* <a href="#" className="button button--circle" id="button-edit">
                ✎
              </a> */}
              {userInfo?._id === userProfile?._id ? (
                <Button shape="circle" icon={<EditFilled />} />
              ) : (
                <Button>Add friend</Button>
              )}
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

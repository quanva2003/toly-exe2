import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Badge, Spin, Tabs } from "antd";
import FriendList from "./FriendList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";
import { CameraFilled, LoadingOutlined } from "@ant-design/icons";
interface UserProfileProps {
  _id: string;
  name: string;
  pic: string;
  coverPic: string;
  friends: string[];
}

const UserProfile: React.FC = () => {
  const { user } = ChatState();
  const { id } = useParams<{ id: string }>();
  console.log(user);

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
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );
  }
  console.log(userProfile);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserProfile({ ...userProfile, pic: res.data.url });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/upload-cover",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserProfile({ ...userProfile, coverPic: res.data.url });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="profileCenter">
          <div className="profileCenterTop">
            <img
              // src="https://images.unsplash.com/photo-1715356758153-6d58ae44e8fe?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              src={userProfile.coverPic}
              alt="coverphoto"
              className="coverPhoto"
            />
            <input
              type="file"
              onChange={handleCoverUpload}
              style={{ display: "none" }}
              id="cover"
            />
            <button className="editCoverPhotoBtn">
              {user.accountType === "free" ? (
                <>
                  <CameraAltIcon />
                  <b
                    onClick={() => {
                      toast.error("Premium Account Only");
                    }}
                  >
                    Edit <span className="editPicText">Cover Photo</span>
                  </b>
                </>
              ) : (
                <>
                  <CameraAltIcon />
                  <label htmlFor="cover" style={{ cursor: "pointer" }}>
                    <b>
                      Edit <span className="editPicText">Cover Photo</span>
                    </b>
                  </label>
                </>
              )}
            </button>
          </div>
          <div className="profileCenterDown">
            <div className="profileCenterDownCont">
              <div className="profilePhotoCont">
                <input
                  type="file"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                  id="upload"
                />
                {user.accountType === "free" ? (
                  <>
                    <img
                      src={userProfile.pic}
                      alt={userProfile.name}
                      className="profilePhoto"
                      onClick={() => toast.error("Premium Account Only")}
                    />
                  </>
                ) : (
                  <>
                    <Badge
                      count={
                        <label htmlFor="upload">
                          <CameraFilled
                            style={{
                              fontSize: "20px",
                              padding: 5,
                              backgroundColor: "#ccc",
                              borderRadius: 50,
                              cursor: "pointer",
                            }}
                          />
                        </label>
                      }
                      offset={[-20, 125]}
                    >
                      <img
                        src={userProfile.pic}
                        alt={userProfile.name}
                        className="profilePhoto"
                      />
                    </Badge>
                  </>
                )}
              </div>
              <h4 className="profileUsername">
                {user.name}
                <p style={{ fontSize: "16px", margin: "0", opacity: "0.5" }}>
                  {userProfile.friends.length} friends
                </p>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="profileMain">
        <Tabs defaultActiveKey="1" items={items} className="user-tab" />
      </div>
    </div>
  );
};

export default UserProfile;

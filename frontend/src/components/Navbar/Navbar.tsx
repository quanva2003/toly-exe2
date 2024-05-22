import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO-TOLY.png";
import LogoutButton from "../../components/Chat/LogoutButton";
import { Dropdown, MenuProps, Space } from "antd";
import { MessageFilled } from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
const items: MenuProps["items"] = [
  {
    label: (
      <Link to="/profile" className="login-link">
        Profile
      </Link>
    ),
    key: "0",
  },

  {
    type: "divider",
  },
  {
    label: (
      <Space>
        <LogoutButton /> Logout
      </Space>
    ),
    key: "1",
  },
];
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = ChatState();
  const profileData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const profilePic = profileData.pic;
  console.log(profilePic);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(user);

  return (
    <nav
      style={
        isScrolled
          ? { backgroundColor: "white" }
          : { backgroundColor: "transparent" }
      }
    >
      <Link to="/">
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>
      </Link>
      <div className="menu">
        <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Home</div>
        </Link>
        <div className="divider">|</div>{" "}
        {/* Divider between Home and Explore */}
        <Link to="/explore" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Explore</div>
        </Link>
        <div className="divider">|</div>{" "}
        {/* Divider between Explore and Contact */}
        <Link to="/contact" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Contact</div>
        </Link>
      </div>

      {!user ? (
        <div className="login">
          <Link to="/signup" className="login-link">
            SIGNIN
          </Link>
          <Link to="/login">
            <button className="login-btn">LOGIN</button>
          </Link>
        </div>
      ) : (
        <div className="login">
          {/* <LogoutButton />
          <Link to="/profile" className="login-link">
            Profile
          </Link> */}
          <Link to="/chats" style={{ textDecoration: "none", color: "unset" }}>
            <MessageFilled className="mess-icon" />
          </Link>

          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              {/* <Space className="login-link">Click me</Space> */}
              <img
                src={profilePic}
                alt="Profile"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </Dropdown>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoutButton from "../Chat/LogoutButton";
import { Dropdown, MenuProps, Space } from "antd";
import { MessageFilled, TeamOutlined } from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = ChatState();
  console.log("hi", user);

  const profileData = JSON.parse(localStorage.getItem("chat-user") || "{}");
  const profilePic = profileData.pic;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => navigate(`/profile/${user._id}`)}
          className="login-link"
        >
          Profile
        </div>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <Space>
          <LogoutButton />
        </Space>
      ),
      key: "1",
    },
  ];
  return (
    <nav
      style={
        isScrolled
          ? {
              backgroundColor: " rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid #ccc",
            }
          : { backgroundColor: "transparent" }
      }
    >
      <Link to="/home">
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>
      </Link>
      <div
        className={`menu ${menuOpen ? "active" : ""}`}
        style={!user ? { marginLeft: "125px" } : {}}
      >
        <Link to="/home" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Home</div>
        </Link>
        <div className="divider">|</div>
        <Link to="/explore" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Explore</div>
        </Link>
        <div className="divider">|</div>
        <Link to="/contact" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Contact</div>
        </Link>
      </div>

      {!user ? (
        <div className={`login ${menuOpen ? "active" : ""}`}>
          <Link to="/signup" className="login-link">
            SIGNIN
          </Link>
          <Link to="/login">
            <button className="login-btn">LOGIN</button>
          </Link>
        </div>
      ) : (
        <div className="login">
          <Link
            to="/friends"
            style={{ textDecoration: "none", color: "unset" }}
          >
            <TeamOutlined className="mess-icon" />
          </Link>
          <Link to="/chats" style={{ textDecoration: "none", color: "unset" }}>
            <MessageFilled className="mess-icon" />
          </Link>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <img
                src={user.pic}
                alt="Profile"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </Dropdown>
        </div>
      )}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;

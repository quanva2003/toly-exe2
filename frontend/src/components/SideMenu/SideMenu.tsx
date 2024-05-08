import React, { useState } from "react";
import LogoutButton from "../Sidebar/LogoutButton";
import useSidebar from "../../zustand/useSidebar";
import { FiMessageCircle, FiUsers, FiCompass } from "react-icons/fi";

const SideMenu: React.FC = () => {
  const { setSelectedSidebar } = useSidebar();

  const [selectedContent, setSelectedContent] = useState("");

  const handleMenuClick = (content: string) => {
    setSelectedSidebar(content);
    setSelectedContent(content);
  };

  return (
    <div
      style={{
        borderRight: "1px solid #A0AEC0",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        // lineHeight: 10,
        // alignContent: "center"
      }}
    >
      <FiMessageCircle
        onClick={() => handleMenuClick("Conversations")}
        style={{
          width: "24px",
          height: "24px",
          color: "black",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: selectedContent === "Conversations" ? "lightgray" : ""
        }}
      />{" "}
      <FiUsers
        onClick={() => handleMenuClick("FriendList")}
        style={{
          width: "24px",
          height: "24px",
          color: "black",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: selectedContent === "FriendList" ? "lightgray" : ""
        }}
      />{" "}
      <FiCompass
        onClick={() => handleMenuClick("Explore")}
        style={{
          width: "24px",
          height: "24px",
          color: "black",
          cursor: "pointer",
          marginBottom: "20px",
          backgroundColor: selectedContent === "Explore" ? "lightgray" : ""
        }}
      />{" "}
      <LogoutButton />
    </div>
  );
};

export default SideMenu;

import React from "react";
import MessageContainer from "../components/Messages/MessageContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import SideMenu from "../components/SideMenu/SideMenu";

const ChatPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    height: "88vh",
    width: "100vw",
    borderRadius: "lg",
    overflow: "hidden",
    backgroundColor: "rgba(192, 192, 192, 0)", // Using rgba for opacity
    // backdropFilter: "blur(20px)",
    // Fallback for older browsers
    WebkitBackdropFilter: "blur(20px)",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <SideMenu />
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};

export default ChatPage;

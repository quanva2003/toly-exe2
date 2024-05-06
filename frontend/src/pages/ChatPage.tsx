import React from "react";
import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const ChatPage: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    height: "100vh",
    width: "100vw",
    borderRadius: "lg",
    overflow: "hidden",
    backgroundColor: "rgba(192, 192, 192, 0)", // Using rgba for opacity
    backdropFilter: "blur(20px)",
    // Fallback for older browsers
    WebkitBackdropFilter: "blur(20px)",
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default ChatPage;

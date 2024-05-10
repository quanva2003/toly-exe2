import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

interface MessageProps {
  message: {
    senderId: string;
    createdAt: Date;
    message: string;
    shouldShake: boolean;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe: boolean = message.senderId === authUser._id;
  const formattedTime: string = extractTime(message.createdAt);
  const chatStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: fromMe ? "row-reverse" : "row",
    alignItems: "flex-start",
    marginBottom: "1rem",
  };
  const imageStyle: React.CSSProperties = {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: fromMe ? "0" : "1rem",
    marginLeft: fromMe ? "1rem" : "0",
  };
  const bubbleContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: fromMe ? "flex-end" : "flex-start",
    width: "100%",
  };
  const bubbleStyle: React.CSSProperties = {
    maxWidth: "70%",
    padding: "0.75rem",
    borderRadius: "1rem",
    backgroundColor: fromMe ? "#007bff" : "#f0f0f0",
    color: fromMe ? "#fff" : "#333",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "0.5rem",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  };
  const footerStyle: React.CSSProperties = {
    opacity: 0.6,
    fontSize: "0.75rem",
    textAlign: fromMe ? "left" : "right",
  };
  const shakeStyle: React.CSSProperties = {
    animation: message.shouldShake ? "shake 0.5s" : "",
  };

  const profilePic: string | undefined = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  return (
    <div style={chatStyle}>
      <div style={imageStyle}>
        <img
          alt="Profile Pic"
          src={profilePic}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={bubbleContainerStyle}>
        <div style={{ ...bubbleStyle, ...shakeStyle }}>{message.message}</div>
        <div style={footerStyle}>{formattedTime}</div>
      </div>
    </div>
  );
};

export default Message;

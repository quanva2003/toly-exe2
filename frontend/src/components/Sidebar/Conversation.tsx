import React from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

interface ConversationProps {
  conversation: {
    _id: string;
    name: string;
    profilePic: string;
  };
  lastIdx: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  lastIdx,
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id; // Assuming conversation is accessible here
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id); // Assuming conversation is accessible here

  return (
    <>
      <div
        style={{
          display: "flex",
          // gap: "2rem",
          alignItems: "center",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          borderRadius: "0.5rem",
          backgroundColor: isSelected ? "#87CEEB" : "transparent",
        }}
        onClick={() => setSelectedConversation(conversation)} // Assuming conversation is accessible here
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "1rem",
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            backgroundColor: isOnline ? "green" : "transparent",
          }}
        >
          <img
            src={conversation.profilePic} // Assuming conversation is accessible here
            alt="user avatar"
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "bold", color: "black", fontSize: "14px" }}>
              {conversation.name}{" "}
              {/* Assuming conversation is accessible here */}
            </p>
            {/* <span className="text-xl">{emoji}</span> */}
          </div>
        </div>
      </div>

      {/* {!lastIdx && <div className="divider my-0 py-0 h-1" />} */}
    </>
  );
};
export default Conversation;

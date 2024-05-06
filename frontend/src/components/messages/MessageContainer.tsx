import React, { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer: React.FC = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "column" }}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div
            style={{
              padding: "4px",
              marginBottom: "2px",
              borderBottom: "1px solid gray",
            }}
          >
            <span style={{ fontFamily: "sans-serif", color: "black" }}>
              To:
            </span>{" "}
            <span style={{ color: "black", fontWeight: "bold" }}>
              {selectedConversation.name}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected: React.FC = () => {
  const { authUser } = useAuthContext();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "4px",
          textAlign: "center",
          fontSize: "1.125rem",
          fontWeight: "600",
          color: "rgba(0,0,0,0.8)",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
        }}
      >
        <p>Welcome {authUser.name} </p>
        <p>Select a chat to start messaging</p>
        <TiMessages style={{ fontSize: "1.5rem", margin: "auto" }} />
      </div>
    </div>
  );
};

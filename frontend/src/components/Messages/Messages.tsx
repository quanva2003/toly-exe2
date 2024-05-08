import React from "react";
import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.tsx";
import Message from "./Message.tsx";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages: React.FC = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div style={{ paddingLeft: "1rem", flex: "1", overflow: "auto" }}>
      {!loading &&
        messages.length > 0 &&
        messages.map((message: any, index: any) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;

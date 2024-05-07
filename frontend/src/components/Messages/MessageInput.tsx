// import { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessage } = useSendMessage();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message) return;
//     await sendMessage(message);
//     setMessage("");
//   };

//   const inputStyles = {
//     border: "1px solid #718096",
//     fontSize: "0.875rem",
//     borderRadius: "0.5rem",
//     display: "block",
//     width: "100%",
//     padding: "0.625rem",
//     backgroundColor: "#fff",
//     color: "#000",
//   };

//   const buttonStyles = {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     paddingRight: "0.75rem",
//   };

//   return (
//     <form
//       style={{ padding: "0 1rem", marginTop: "0.75rem" }}
//       onSubmit={handleSubmit}
//     >
//       <div style={{ position: "relative", width: "100%" }}>
//         <input
//           type="text"
//           style={inputStyles}
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" style={buttonStyles}>
//           {loading ? (
//             <div className="loading loading-spinner"></div>
//           ) : (
//             <BsSend />
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

import React from "react";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  const inputStyles: React.CSSProperties = {
    border: "1px solid #718096",
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
    display: "block",
    width: "100%",
    padding: "0.625rem",
    backgroundColor: "#fff",
    color: "#000",
  };

  const buttonStyles: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
  };

  return (
    <form
      style={{ padding: "0.5rem", marginTop: "0.75rem" }}
      onSubmit={handleSubmit}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="text"
          style={inputStyles}
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" style={buttonStyles}>
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

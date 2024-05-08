import React from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar: React.FC = () => {
  return (
    <div
      style={{
        borderRight: "1px solid #A0AEC0",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        width: "25vw",
      }}
    >
      <SearchInput />
      <div
        style={{
          height: "1px",
          backgroundColor: "#CBD5E0",
          margin: "0.5rem 0",
        }}
      ></div>
      <Conversations />
    </div>
  );
};

export default Sidebar;

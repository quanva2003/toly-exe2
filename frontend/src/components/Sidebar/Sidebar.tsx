import React from "react";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import useSidebar from "../../zustand/useSidebar";
import Test from "./test";

const Sidebar: React.FC = () => {
  const { selectedSidebar } = useSidebar();

  let content: JSX.Element;

  switch (selectedSidebar) {
    case "Conversations":
      content = <Conversations />;
      break;
    case "FriendList":
      content = <Test />;
      break;
    case "Explore":
      content = <Conversations />;
      break;
    default:
      content = <Conversations />;
  }

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
      {/* <Conversations /> */}
      {content}
    </div>
  );
};

export default Sidebar;

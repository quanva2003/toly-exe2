import React, { useEffect } from "react";
import useSidebar from "../../zustand/testUseSidebar";
import LogoutButton from "../Sidebar/LogoutButton";

const SideMenu: React.FC = () => {
  const { selectedSidebar, setSelectedSidebar } = useSidebar();

  useEffect(() => {
    return () => setSelectedSidebar(null);
  }, [setSelectedSidebar]);

  return (
    <div
      style={{
        borderRight: "1px solid #A0AEC0",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        lineHeight: 3,
        // alignContent: "center"
      }}
    >
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
      <LogoutButton />
    </div>
  );
};

export default SideMenu;

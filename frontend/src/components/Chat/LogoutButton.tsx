import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { Space } from "antd";

const LogoutButton: React.FC = () => {
  const { logout } = useLogout();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    logout();
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Set loading to false after 5 seconds
  };

  return (
    <div className="mt-auto">
      {!loading ? (
        <Space
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          <BiLogOut
            style={{
              width: "24px",
              height: "24px",
              color: "black",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          />
          Logout
        </Space>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;

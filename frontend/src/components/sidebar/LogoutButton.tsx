import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton: React.FC = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <BiLogOut
          style={{
            width: "24px",
            height: "24px",
            color: "black",
            cursor: "pointer",
          }}
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;

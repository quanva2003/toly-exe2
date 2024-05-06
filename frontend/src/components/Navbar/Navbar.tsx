import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/LOGO-TOLY.png";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      style={
        isScrolled
          ? { backgroundColor: "white" }
          : { backgroundColor: "transparent" }
      }
    >
      <Link to="/">
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>
      </Link>
      <div className="menu">
        <Link to="/home" style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">HOME</div>
        </Link>
        <div className="menu-link">FRIENDS</div>
        <div className="menu-link">CONTACT</div>
      </div>
      <div className="login">
        <Link to="/signup" className="login-link">
          SIGNIN
        </Link>
        <Link to="/login">
          <button className="login-btn">LOGIN</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

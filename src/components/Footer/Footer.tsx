// footer.tsx

import React from "react";
import Logo from "../../assets/LOGO-TOLY.png";
import "./Footer.css";
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="first-line">
        <div className="footer-column">
          <h3>About Toly</h3>
          <ul>
            <li>
              Toly is an online service to help you meet real new friends, from
              your neighborhood or from around the world.
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Menu</h3>
          <ul>
            <li>Home</li>
            <li>Friends</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="second-line">
        <div className="footer-corporate">
          <img src={Logo} alt="" />
          <p>© 2024 by Toly-team</p>
          <p>Terms · Privacy · Sitemap · Company details</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

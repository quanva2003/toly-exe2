// footer.tsx

import React from "react";
import Logo from "../../assets/LOGO-TOLY.png";
import "./Footer.css";
import classes from "./Footer.module.css";
import {
  FacebookOutlined,
  MailOutlined,
  TikTokOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={classes.branch}>
        <h2>Menu</h2>
        <div className={classes.branch_list}>
          <span>Home</span>
          <span>Explore</span>
          <span>Contact</span>
        </div>
      </div>
      <div className={classes.lower}>
        <section className={classes.about}>
          <h2>About</h2>
          <p className="text-justify">
            Welcome to Toly Web, your go-to platform for exploration and social
            connection! Discover exciting new places and share hints with your
            friends. Stay connected and chat seamlessly as you plan your next
            adventure. Join Toly Web today and start exploring together!
          </p>
        </section>
        <section className={classes.socials}>
          <h2>We are Social</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              marginTop: "2rem",
            }}
          >
            <FacebookOutlined />
            <TikTokOutlined />
            <MailOutlined />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

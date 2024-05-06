import React from "react";
import "./Banner.css";
import Chat from "./Chat";

const Banner: React.FC = () => {
  return (
    <div className="banner-container">
      <div className="left-part">
        <p className="banner-title">AI CHATBOT GENERATOR</p>
        <p className="banner-des">
          Turn leads into revenue and keep customers satisfied.
        </p>
        <button className="cta-button">Try Landbot for Free</button>
      </div>
      <div className="right-part">
        {/* <div className="chat-box">
          <div className="chat-bubble bot">
            <span className="avatar">Landbot:</span>
            <p>Hi there, I'm Landbot! 🤖</p>
            <img src="ironman.png" alt="Iron Man" className="ironman-image" />
          </div>
          <div className="chat-bubble user">
            <span className="avatar">You:</span>
            <p>What can you do?</p>
          </div>
        </div>*/}
        <Chat />
      </div>
    </div>
  );
};

export default Banner;

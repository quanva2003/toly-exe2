import React from "react";
import "./Mainboard.css";
import Banner from "../Banner/Banner";
import Strategy from "../Strategy/Strategy";
import Different from "../Different/Different";

const MainBoard: React.FC = () => {
  return (
    <div className="mainboard-container">
      <Banner />
      <Strategy />
      <Different />
    </div>
  );
};

export default MainBoard;

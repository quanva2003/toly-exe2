import React from "react";
import "./Tolymium.css";
import { Button, Carousel, Tag } from "antd";
const contentStyle: React.CSSProperties = {
  height: "10px",
  width: "10px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Tolymium: React.FC = () => {
  return (
    <div className="pre-container">
      <div className="pre">
        <h1 className="pre-header">Tolymium</h1>
        <div className="pre-detail">
          {/* <Carousel autoplay>
            <div>
              <img
                src="https://images.unsplash.com/photo-1614925861087-aa06270091b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 1"
                style={contentStyle}
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1614925861087-aa06270091b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 2"
                style={contentStyle}
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1614925861087-aa06270091b3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Image 3"
                style={contentStyle}
              />
            </div>
          </Carousel> */}
          <div className="pre-price">
            <div className="price-card">
              <div className="price-des">
                <div className="price-header">
                  <h2 className="price-title">Month</h2>
                  {/* <Tag color="#2db7f5">Free for student!</Tag> */}
                </div>
                {/* <p>For individuals that need advanced recording & editing.</p> */}
              </div>
              <div className="price">
                <h1 className="price-number">49.000VND</h1>
                <Button size="large" type="primary">
                  Start
                </Button>
              </div>
            </div>
            <div className="price-card">
              <div className="price-des">
                <div className="price-header">
                  <h2 className="price-title">Year</h2>
                  <Tag color="#2db7f5">Recommend!</Tag>
                </div>
                {/* <p>For individuals that need advanced recording & editing.</p> */}
              </div>
              <div className="price">
                <h1 className="price-number">490.000VND</h1>
                <Button size="large" type="primary">
                  Start
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tolymium;

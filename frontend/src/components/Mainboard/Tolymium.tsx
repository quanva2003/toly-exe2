import React from "react";
import "./Tolymium.css";
import { Button, Carousel, Space, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
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
          <div className="price-card">
            <div className="price-header">
              <p className="pre-package-name">Free</p>
              <div className="pre-package-price">
                <h1 className="price-number">0đ</h1>
                <p className="price-number-time">/month</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
            </div>
            <button className="trial-btn">USE FREE</button>
          </div>
          <div className="price-card">
            <div className="price-header">
              <p className="pre-package-name">Tolymium</p>
              <div className="pre-package-price">
                <h1 className="price-number">49.000đ</h1>
                <p className="price-number-time">/months</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
            </div>
            <button className="trial-btn">USE TOLYMIUM</button>
          </div>
          <div className="price-card">
            <div className="price-header">
              <p className="pre-package-name">Tolymium</p>
              <div className="pre-package-price">
                <h1 className="price-number">490.000đ</h1>
                <p className="price-number-time">/year</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
            </div>
            <button className="trial-btn">USE TOLYMIUM</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tolymium;

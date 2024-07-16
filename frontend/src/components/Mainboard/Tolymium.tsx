import React from "react";
import "./Tolymium.css";
import { Space } from "antd";
import { CheckCircleFilled, StarFilled, CrownFilled } from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  const { user } = ChatState();
  console.log(user);
  const navigate = useNavigate();
  const handleButtonClick = async (amount, description, type) => {
    try {
      const { data } = await axios.post(
        "https://backend-toly.onrender.com/api/order/create-payment-link",
        {
          amount: amount,
          description: description,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="pre-container">
      <div className="pre">
        <h1 className="pre-header">Tolymium</h1>
        <div className="pre-detail">
          <div className="price-card">
            <div className="price-header">
              <Space className="pre-package-name" align="center">
                Tolymium
                <StarFilled style={{ fontSize: "24px", color: "#FFE500" }} />
              </Space>
              <div className="pre-package-price">
                <h1 className="price-number">29.000đ</h1>
                <p className="price-number-time">/months</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Unlimited fun place recommendations for groups
                </span>
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Unlimited personal location customization
                </span>
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Can use explore in your group chat
                </span>
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Can do more feature of your profile
                </span>
              </Space>
            </div>
            {user && (
              <button
                className="trial-btn"
                onClick={() => {
                  if (user.accountType !== "premium_month") {
                    handleButtonClick(
                      2000,
                      "Payment for Tolymium ",
                      "premium_month"
                    );
                  }
                }}
              >
                {user.accountType === "premium_month"
                  ? "YOUR CURRENT PLAN"
                  : "USE TOLYMIUM"}
              </button>
            )}
            {!user && (
              <button className="trial-btn" onClick={() => navigate("/login")}>
                USE TOLYMIUM
              </button>
            )}
          </div>
          <div className="price-card">
            <div className="price-header">
              <Space className="pre-package-name">
                Tolymium{" "}
                <CrownFilled style={{ fontSize: "24px", color: "#FFE500" }} />
              </Space>
              <div className="pre-package-price">
                <h1 className="price-number">290.000đ</h1>
                <p className="price-number-time">/year</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Unlimited fun place recommendations for groups
                </span>
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Unlimited personal location customization
                </span>
              </Space>{" "}
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  Unlock all sticker and theme locks
                </span>
              </Space>{" "}
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} />
                <span
                  style={{
                    textWrap: "wrap",
                    maxWidth: "180px",
                  }}
                >
                  No limit to friend circle groups (max: 50 groups)
                </span>
              </Space>
            </div>
            {user && (
              <button
                className="trial-btn"
                onClick={() => {
                  if (user.accountType !== "premium_year") {
                    handleButtonClick(
                      4000,
                      "Payment for Tolymium ",
                      "premium_year"
                    );
                  } else {
                    navigate(`/profile/${user._id}`);
                  }
                }}
              >
                {user.accountType === "premium_year"
                  ? "YOUR CURRENT PLAN"
                  : "USE TOLYMIUM"}
              </button>
            )}
            {!user && (
              <button className="trial-btn" onClick={() => navigate("/login")}>
                USE TOLYMIUM
              </button>
            )}
          </div>
          {!user || (user && user.accountType === "free") ? (
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
                  <CheckCircleFilled style={{ color: "#54b4b9" }} />
                  <span
                    style={{
                      textWrap: "wrap",
                      maxWidth: "180px",
                    }}
                  >
                    Two location recommendations per week
                  </span>
                </Space>

                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} />
                  <span
                    style={{
                      textWrap: "wrap",
                      maxWidth: "180px",
                    }}
                  >
                    Create only 1 groups
                  </span>
                </Space>
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} />
                  <span
                    style={{
                      textWrap: "wrap",
                      maxWidth: "180px",
                    }}
                  >
                    Use basic icons
                  </span>
                </Space>
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} />
                  <span
                    style={{
                      textWrap: "wrap",
                      maxWidth: "180px",
                    }}
                  >
                    Chat with friends via mini social
                  </span>
                </Space>
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} />
                  <span
                    style={{
                      textWrap: "wrap",
                      maxWidth: "180px",
                    }}
                  >
                    Personal and friend location tracking
                  </span>
                </Space>
              </div>
              <button
                className="trial-btn"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  }
                }}
              >
                {!user || user.accountType !== "free" ? "USE FREE" : "USED"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Tolymium;

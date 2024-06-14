import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

interface OrderProps {
  orderCode: string;
  amount: number;
  createdAt: Date;
}

const SuccessPay: React.FC = () => {
  const navigate = useNavigate();
  const { user } = ChatState();
  const [orders, setOrders] = useState<OrderProps>();
  const urlParams = new URLSearchParams(window.location.search);
  const orderCode = urlParams.get("orderCode");

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (orderCode !== null) {
          const { data } = await axios.get(
            `http://localhost:5000/api/order/get-payment-link-info/${orderCode}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setOrders(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getOrder();
  });

  const createOrder = async () => {
    try {
      if (orderCode && orders) {
        const { data } = await axios.post(
          `http://localhost:3000/api/order/create-order/${orderCode}`,
          {
            amount: orders.amount,
            createdAt: orders.createdAt,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Fetch error:", error.response.data);
      } else {
        console.error("Fetch error:", error.message);
      }
    }
  };

  return (
    <>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" onClick={() => createOrder()}>
            Go Home
          </Button>,
          <Button onClick={() => navigate("/home")} key="buy">
            Buy Again
          </Button>,
        ]}
      />
    </>
  );
};

export default SuccessPay;

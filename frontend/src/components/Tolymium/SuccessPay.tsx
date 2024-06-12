import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPay: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go Console
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

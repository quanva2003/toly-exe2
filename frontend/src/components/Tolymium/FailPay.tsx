import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const FailPay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button
          type="primary"
          key="console"
          onClick={() => navigate("/tolymium")}
        >
          Go Tolymium
        </Button>
      }
    />
  );
};

export default FailPay;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Space, Statistic, Select } from "antd";
import {
  UserOutlined,
  CompassOutlined,
  StarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface User {
  _id: string;
  name: string;
  pic: string;
  email: string;
  createdAt: string;
}

interface Order {
  _id: string;
  purchaser: User | null;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    yAxisID: string;
  }[];
}

const Dashboard = () => {
  const { user } = ChatState();
  const [users, setUsers] = useState<User[]>([]);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [interval, setInterval] = useState<string>("month");

  const stats = {
    newUsers: users.length,
    newExplores: 45,
    premiumUpdates: 30,
    totalUsers: users.length,
  };

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Revenue in USD",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y",
      },
    ],
  });
  console.log("chartData: ", chartData);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      // y: {
      //   type: "linear" as const,
      //   display: true,
      //   position: "left" as const,
      // },
      y: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
        // max: 5000000,
      },
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const usersData: User[] = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/order/all-order",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const ordersData: Order[] = response.data;
      setOrderData(ordersData);
    } catch (error) {
      console.error("Error fetching orders from API", error);
    }
  };

  const getRevenueData = (interval: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let labels: string[] = [];

    switch (interval) {
      case "week":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1
        );
        labels = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          return date.toISOString().split("T")[0];
        });
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        labels = Array.from({ length: endDate.getDate() }, (_, i) => {
          const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
          return date.toISOString().split("T")[0];
        });
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        labels = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(now.getFullYear() - 1, i, 1);
          return date.toLocaleString("default", { month: "long" });
        });
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        labels = Array.from({ length: endDate.getDate() }, (_, i) => {
          const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
          return date.toISOString().split("T")[0];
        });
        break;
    }

    const filteredOrders = orderData.filter(
      (order) =>
        new Date(order.createdAt) >= startDate &&
        new Date(order.createdAt) <= endDate
    );

    const revenueData = labels.map((label, index) => {
      const currentDate = new Date(labels[index]);
      const nextDate = new Date(labels[index + 1] || currentDate);

      const revenue = filteredOrders.reduce((totalRevenue, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate >= currentDate && orderDate < nextDate) {
          if (order.type === "premium_month") {
            return totalRevenue + 29000;
          } else if (order.type === "premium_year") {
            return totalRevenue + 290000;
          }
        }
        return totalRevenue;
      }, 0);

      return revenue;
    });

    return { labels, revenueData };
  };

  useEffect(() => {
    fetchData();
    fetchOrders();
  }, [user]);

  useEffect(() => {
    const { labels, revenueData } = getRevenueData(interval);
    setChartData({
      labels,
      datasets: [
        {
          ...chartData.datasets[0], // Keep existing dataset properties
          data: revenueData,
        },
      ],
    });
  }, [orderData, interval]);

  return (
    <div style={{ height: "599px", boxSizing: "border-box" }}>
      <h1>Dashboard</h1>
      <Select
        value={interval}
        onChange={(value: string) => setInterval(value)}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Select.Option value="week">Week</Select.Option>
        <Select.Option value="month">Month</Select.Option>
        <Select.Option value="year">Year</Select.Option>
      </Select>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Card>
          <Space direction="horizontal" style={{ gap: "1rem" }}>
            <GlobalOutlined
              style={{
                color: "blue",
                backgroundColor: "#ccc",
                borderRadius: 50,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="New Users This Week" value={stats.newUsers} />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal" style={{ gap: "1rem" }}>
            <CompassOutlined
              style={{
                color: "blue",
                backgroundColor: "#ccc",
                borderRadius: 50,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic
              title="New Explores This Week"
              value={stats.newExplores}
            />
          </Space>
        </Card>

        <Card>
          <Space direction="horizontal" style={{ gap: "1rem" }}>
            <StarOutlined
              style={{
                color: "blue",
                backgroundColor: "#ccc",
                borderRadius: 50,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic
              title="Premium Updates This Week"
              value={stats.premiumUpdates}
            />
          </Space>
        </Card>

        <Card>
          <Space direction="horizontal" style={{ gap: "1rem" }}>
            <UserOutlined
              style={{
                color: "blue",
                backgroundColor: "#ccc",
                borderRadius: 50,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic title="Total Users" value={stats.totalUsers} />
          </Space>
        </Card>
      </div>

      <div style={{ marginTop: "50px" }}>
        <Line data={chartData} options={chartOptions} height={70} />
      </div>
    </div>
  );
};

export default Dashboard;

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
  // InteractionMode,
} from "chart.js";
import { Card, Space, Statistic } from "antd";
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
  purchaser: User;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  // Sample data for the statistics
  const stats = {
    newUsers: 120,
    newExplores: 45,
    premiumUpdates: 30,
    totalUsers: 5000,
  };

  // Sample data for the chart
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue in USD",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Users Joined",
        data: [150, 100, 350, 200, 50, 300, 350],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        yAxisID: "y1",
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  } as const;
  const { user } = ChatState();
  const [users, setUsers] = useState<User[]>([]);
  const [usersOfWeek, setUsersOfWeek] = useState<User[]>([]);
  // const [orders, setOrders] = useState<Order[]>([]);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const now = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);

      const usersData = response.data;
      console.log(usersData);

      const usersThisWeek = usersData.filter(
        (user) => new Date(user.createdAt) > oneWeekAgo
      );
      console.log(usersThisWeek);

      setUsers(usersData);
      setUsersOfWeek(usersThisWeek);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/order/all-orders",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const ordersData = response.data;
      console.log(ordersData);
      // setOrders(ordersData);

      // Filter orders by type and calculate revenue
      const filteredOrders = ordersData.filter(
        (order) =>
          order.type === "premium_month" || order.type === "premium_year"
      );

      setOrderData(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders from API", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);
  const getRevenueData = (interval: string) => {
    const now = new Date();
    const startDate = new Date();

    switch (interval) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "half-year":
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
        break;
    }

    const filteredOrders = orderData.filter(
      (order) => new Date(order.createdAt) > startDate
    );

    // Calculate total revenue for each interval
    const revenueData: number[] = [];
    for (let i = 0; i < chartData.labels.length; i++) {
      const startDateLabel = new Date(chartData.labels[i]);
      const endDateLabel = new Date(chartData.labels[i + 1] || now);

      const revenue = filteredOrders.reduce((totalRevenue, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate >= startDateLabel && orderDate < endDateLabel) {
          if (order.type === "premium_month") {
            return totalRevenue + 29000; // Adjust this based on your actual revenue calculation
          } else if (order.type === "premium_year") {
            return totalRevenue + 290000; // Adjust this based on your actual revenue calculation
          }
        }
        return totalRevenue;
      }, 0);

      revenueData.push(revenue);
    }

    return revenueData;
  };

  // Update chart data with revenue based on selected interval
  useEffect(() => {
    const updatedChartData = { ...chartData };
    updatedChartData.datasets[0].data = getRevenueData("month");
    setChartData(updatedChartData);
  }, [orderData]);

  // useEffect(() => {
  //   fetchUsersOfWeek();
  //   fetchUsers();
  // }, []);
  return (
    <div style={{ height: "599px", boxSizing: "border-box" }}>
      <h1>Dashboard</h1>
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
            <Statistic title="Total Users" value={users.length} />
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

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
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue in USD",
        data: [5000, 6000, 7000, 8000, 7500, 8500, 9000],
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
  };

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
  useEffect(() => {
    fetchData();
  }, []);

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

import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, List, Popconfirm } from "antd";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
const { Search } = Input;
interface User {
  _id: string;
  name: string;
  pic: string;
  email: string;
  isVerify: boolean;
}

const UsersList: React.FC = () => {
  const { user } = ChatState();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://backend-toly.onrender.com/api/user",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const verifiedUsers = response.data.filter((user: User) => user.isVerify);
      setUsers(verifiedUsers);
      setFilteredUsers(verifiedUsers);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(
        `https://backend-toly.onrender.com/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUsers(users.filter((user) => user._id !== userId));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h3>Total: {users.length} users</h3>
      <Search
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <List
        pagination={{ pageSize: 7 }}
        dataSource={filteredUsers}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete the user"
                description="Are you sure to delete this user?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={() => deleteUser(item._id)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.pic} size={"large"} />}
              title={item.name}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default UsersList;

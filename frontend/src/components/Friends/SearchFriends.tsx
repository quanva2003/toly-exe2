import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, List, Avatar, Button, message } from "antd";
import { ChatState } from "../../context/ChatProvider";

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
}

const SearchFriends: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = ChatState();

  useEffect(() => {
    const fetchUsers = async () => {
      if (search.trim()) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/user/name/${search}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users", error);
          message.error("Failed to fetch users. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setUsers([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, user.token]);

  return (
    <div>
      <Input
        placeholder="Search friends by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <List
        itemLayout="horizontal"
        dataSource={users}
        loading={loading}
        renderItem={(user) => (
          <List.Item actions={[<Button key="add">Add friend</Button>]}>
            <List.Item.Meta
              avatar={<Avatar src={user.pic} />}
              title={<a href={`/profile/${user._id}`}>{user.name}</a>}
              description={user.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchFriends;

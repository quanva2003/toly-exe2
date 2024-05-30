import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "antd";
import { ChatState } from "../../context/ChatProvider";
import "./SearchUser.css";
interface User {
  id: number;
  name: string;
  mutualFriends: number;
  // Add more properties as needed
}

interface SearchUsersProps {
  initialSearchTerm: string;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = ChatState();

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            search: searchTerm,
          },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      {/* <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      /> */}
      {filteredUsers.map((user) => (
        <Card
          key={user.id}
          style={{ marginTop: 16, width: "70%" }}
          loading={false}
        >
          <div className="user-search-detail">
            <img
              src={`path/to/images/${user.id}`}
              alt={user.name}
              className="user-image"
            />
            <h2 className="user-search-name">{user.name}</h2>
          </div>
          {/* <p className="mutual-friends">{user.mutualFriends} mutual friends</p> */}
          <div className="user-search-action">
            <button className="add-friend-button">Thêm bạn bè</button>
            <button className="send-message-button">Nhắn tin</button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SearchUsers;

import React, { useState, useEffect } from "react";
import { Card, Flex, Input } from "antd";
import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface ExploreListProps {
  setCenter: (position: { lat: number; lng: number }) => void;
  setSelectedLocation: (location: Location) => void;
}

interface Location {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  position: { lat: number; lng: number };
  imageUrl: string;
}

const ExploreList: React.FC<ExploreListProps> = ({
  setCenter,
  setSelectedLocation,
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation(); // Access location object from React Router
  const selectedExplore = location.state?.selectedExplore;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchTerm === "") {
          // Fetch top 4 explorations based on rating (original logic)
          response = await axios.get<Location[]>(
            "http://localhost:5000/api/explore"
          );
          const filteredData = response.data
            .filter((destination) => destination.rating > 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
          setLocations(filteredData);
        } else {
          // Fetch all locations if searchTerm is not empty (original logic)
          response = await axios.get<Location[]>(
            "http://localhost:5000/api/explore"
          );
          setLocations(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  // Update searchTerm when selectedExplore changes
  useEffect(() => {
    if (selectedExplore) {
      setSearchTerm(selectedExplore.name);
    } else {
      setSearchTerm("");
    }
  }, [selectedExplore]);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    if (filteredLocations.length === 1) {
      setCenter(filteredLocations[0].position);
      setSelectedLocation(filteredLocations[0]);
    }
  }, [filteredLocations, setCenter, setSelectedLocation]);

  return (
    <div style={{ height: "88vh", overflowY: "auto" }}>
      <Input
        placeholder="Search location..."
        maxLength={300}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredLocations.map((location, index) => (
        <Card
          key={index}
          hoverable
          style={{ margin: "10px " }}
          onClick={() => {
            setCenter(location.position);
            setSelectedLocation(location);
          }}
          className={
            selectedExplore && selectedExplore._id === location._id
              ? "selected-explore"
              : ""
          }
        >
          <Flex justify="space-between" align="center">
            <img
              src={location.imageUrl}
              alt={location.name}
              style={{
                width: "150px",
                height: "200px",
                objectFit: "cover",
                alignItems: "center",
                borderRadius: "10px",
              }}
            />
            <Flex vertical style={{ paddingLeft: 20 }}>
              <p className="location-name">{location.name}</p>
              <p className="location-address">
                <EnvironmentOutlined />
                {location.area}
              </p>
              <p className="location-rating">
                <StarFilled /> {location.rating}
              </p>
              <p>{location.priceRange}</p>
            </Flex>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default ExploreList;

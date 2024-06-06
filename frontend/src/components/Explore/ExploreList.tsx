// ExploreList.tsx
import React, { useState, useEffect } from "react";
import { Card, Flex, Input } from "antd";
import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import "./ExploreList.css";
import locationDb, { Location } from "./LocationDB";
import { SearchIcon } from "@chakra-ui/icons";

interface ExploreListProps {
  setCenter: (position: { lat: number; lng: number }) => void;
  setSelectedLocation: (location: Location) => void;
}

const ExploreList: React.FC<ExploreListProps> = ({
  setCenter,
  setSelectedLocation,
}) => {
  const [locations, setLocations] = useState(locationDb);

  useEffect(() => {
    const fetchLocations = async () => {
      setLocations(locationDb);
    };

    fetchLocations();
  }, []);

  return (
    <div style={{ height: "88vh", overflowY: "auto" }}>
      <Input
        placeholder="Seacrh explore..."
        prefix={<SearchIcon />}
        maxLength={300}
      />
      {locations.map((location, index) => (
        <Card
          key={index}
          hoverable
          style={{ margin: "10px " }}
          onClick={() => {
            setCenter(location.position);
            setSelectedLocation(location);
          }}
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

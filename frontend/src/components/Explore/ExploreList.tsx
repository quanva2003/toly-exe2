// LocationList.tsx
import React, { useState, useEffect } from "react";
import { Card, Flex } from "antd";
import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import "./ExploreList.css";
import locationDb, { Location } from "./LocationDB";
// interface Location {
//   name: string;
//   area: string;
//   rating: number;
//   priceRange: string;
//   imageUrl: string;
// }
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
      {locations.map((location, index) => (
        <Card
          key={index}
          hoverable
          style={{ margin: "10px " }}
          styles={{ body: { padding: 10, overflow: "hidden" } }}
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
            <Flex
              vertical
              //   align="flex-start"
              //   justify="space-between"
              style={{ paddingLeft: 20 }}
            >
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

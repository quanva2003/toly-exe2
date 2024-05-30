// Explore.tsx
import React, { useState } from "react";
import { Col, Row } from "antd";
import ExploreList from "./ExploreList";
import Map from "./Map";
import locationDb, { Location } from "./LocationDB"; // Import locationDb
import DBtest from "./MapTest";
import FriendsList from "../Profile/FriendList";
const Explore: React.FC = () => {
  const [center, setCenter] = useState({ lat: 10.762622, lng: 106.660172 });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [friends, setFriends] = useState([]);
  return (
    <Row>
      <Col span={18} push={6}>
        {/* <Map
          center={center}
          selectedLocation={selectedLocation}
          locations={locationDb}
        /> */}
        <DBtest
          center={center}
          selectedLocation={selectedLocation}
          friends={friends}
        />
      </Col>
      <Col span={6} pull={18} style={{ height: "50vh" }}>
        <ExploreList
          setCenter={setCenter}
          setSelectedLocation={setSelectedLocation}
        />
      </Col>
    </Row>
  );
};

export default Explore;

// Explore.tsx
import React, { useEffect, useState } from "react";
import { Col, Row, notification } from "antd";
import ExploreList from "./ExploreList";
import Map from "./Map";
import locationDb, { Location } from "./LocationDB"; // Import locationDb
import DBtest from "./MapTest";
import FriendsList from "../Profile/FriendList";
import type { NotificationArgsProps } from "antd";
import { ChatState } from "../../context/ChatProvider";
type NotificationPlacement = NotificationArgsProps["placement"];

const Explore: React.FC = () => {
  const [center, setCenter] = useState({ lat: 10.762622, lng: 106.660172 });
  const { user } = ChatState();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [friends, setFriends] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [showNotification, setShowNotification] = useState(false);

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: null,
      description: "Please update position for further feature",
      placement,
      duration: 5,
    });
  };

  const checkUserPosition = () => {
    if (user.position.lat === 0 && user.position.lng === 0) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  };

  useEffect(() => {
    checkUserPosition();
  }, [user.position.lat, user.position.lng]);

  useEffect(() => {
    if (showNotification) {
      openNotification("bottomLeft");
    }
  }, [showNotification]);

  return (
    <Row>
      <Col span={18} push={6}>
        {/* <Map
          center={center}
          selectedLocation={selectedLocation}
          locations={locationDb}
        /> */}
        {/*THIS IS WHERE IT TELL YOU THAT YOU HAVEN'T UPDATE LOCATION*/}
        {contextHolder}
        <DBtest
          center={center}
          selectedLocation={selectedLocation}
          // friends={friends}
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

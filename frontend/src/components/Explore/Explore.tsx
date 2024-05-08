import React from "react";
import { Col, Row } from "antd";
import ExploreList from "./ExploreList";
import Map from "./Map";

const Explore: React.FC = () => (
  <Row>
    <Col span={18} push={6}>
      <Map />
    </Col>
    <Col span={6} pull={18} style={{ height: "50vh" }}>
      <ExploreList />
    </Col>
  </Row>
);

export default Explore;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import "./ExploreDetail.css";
import { Button } from "antd";
import {
  ShareAltOutlined,
  EnvironmentFilled,
  CompassOutlined,
  RightOutlined,
} from "@ant-design/icons";
interface Explore {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  position: {
    lat: number;
    lng: number;
  };
}

const ExploreDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [explore, setExplore] = useState<Explore | null>(null);
  const { user } = ChatState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const response = await axios.get<Explore>(`/api/explore/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setExplore(response.data);
      } catch (error) {
        console.error("Error fetching explore:", error);
      }
    };

    fetchExplore();
  }, [id]);

  if (!explore) {
    return <div>Loading...</div>;
  }
  let ratingDescription;
  if (explore.rating > 4) {
    ratingDescription = "Good";
  } else if (explore.rating >= 2 && explore.rating <= 4) {
    ratingDescription = "Normal";
  } else {
    ratingDescription = "Bad";
  }
  const handleNavigate = () => {
    navigate("/explore", {
      state: { selectedExplore: explore },
    });
  };
  return (
    <div className="explore-detail-container">
      <div className="explore-detail-header">
        <h1>{explore.name}</h1>
        <Button icon={<ShareAltOutlined />} shape="circle" />
      </div>
      <span className="explore-detail-location">
        <EnvironmentFilled /> {explore.area}
      </span>
      <img
        src={explore.imageUrl}
        alt={explore.name}
        className="explore-image"
      />
      <div className="explore-detail-bottom">
        <div className="explore-detail-rate">
          <h2>{explore.rating}</h2>
          <p> {ratingDescription}</p>
        </div>
        <div className="explore-detail-map" onClick={handleNavigate}>
          <CompassOutlined style={{ fontSize: "32px", color: "#0264c8" }} />{" "}
          <p>Navigate</p>
          <RightOutlined style={{ color: "#0264c8", fontSize: "24px" }} />
        </div>
        <div className="explore-detail-price">
          {explore.priceRange}
          <Button>Try it!!!</Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreDetail;

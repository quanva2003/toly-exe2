import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopExplore.css";
interface ExploreData {
  _id: string;
  name: string;
  imageUrl: string;
}

const TopExplore: React.FC = () => {
  const [exploreData, setExploreData] = useState<ExploreData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ExploreData[]>(
          "http://localhost:5000/api/explore"
        );
        console.log(response.data);

        setExploreData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="top-explore">
      <h1>Top Vacation Destinations</h1>
      <div className="destinations">
        {exploreData.map((destination) => (
          <div key={destination._id} className="destination">
            <img src={destination.imageUrl} alt={destination.name} />
            <h2>{destination.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExplore;

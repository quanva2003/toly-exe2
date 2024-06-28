import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import axios from "axios";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import { ChatState } from "../../context/ChatProvider";
import mapboxgl from "mapbox-gl";
interface ExploreData {
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

interface MapProps {
  selectedLocation: ExploreData | null;
}

const Map: React.FC<MapProps> = ({ selectedLocation }) => {
  const handleViewportChange = (newViewport) => {
    setViewport({
      ...viewport,
      ...newViewport,
    });
  };
  const [map, setMap] = useState(null);
  const { user } = ChatState();
  const userId = user._id;
  const [exploreData, setExploreData] = useState<ExploreData[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [friends, setFriends] = useState<any>([]);
  const [friendLists, setFriendLists] = useState<any>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<ExploreData[]>(
        "http://localhost:5000/api/explore"
      );
      setExploreData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFriend = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setFriends(response.data.friends);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const fetchFriendsDetails = async (friends) => {
    try {
      const friendDetails = await Promise.all(
        friends.map(async (friendId) => {
          const response = await axios.get(
            `http://localhost:5000/api/user/${friendId}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          return response.data;
        })
      );
      setFriendLists(friendDetails);
    } catch (error) {
      console.log("Error fetching friends details: ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    exploreData.map((address) => {
      axios
        .get(
          `https://api.mapbox.com/search/geocode/v6/forward?q=${address.name}&access_token=pk.eyJ1Ijoid3VhdmFubjUwNzYiLCJhIjoiY2x4cDF5ZTMxMGQwOTJqcHV2ZXlvYzBybSJ9.S90q1YyODPdio83xGUtYAw`
        )
        .then(function (response) {
          console.log("data:", response);
        })
        .catch(function (error) {
          console.log(error);
        });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setCurrentLocation({ lat: 10.7941, lng: 106.7216 });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 10.7941,
    longitude: 106.7216,
    zoom: 16,
  });

  useEffect(() => {
    if (selectedLocation) {
      setViewport({
        ...viewport,
        latitude: selectedLocation.position.lat,
        longitude: selectedLocation.position.lng,
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    fetchFriend(userId);
  }, [userId]);

  useEffect(() => {
    if (friends.length > 0) {
      fetchFriendsDetails(friends);
    }
  }, [friends]);
  const mapContainerRef = useRef(null);
  useEffect(() => {
    if (currentLocation && selectedLocation && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        accessToken:
          "pk.eyJ1Ijoid3VhdmFubjUwNzYiLCJhIjoiY2x4cDF5ZTMxMGQwOTJqcHV2ZXlvYzBybSJ9.S90q1YyODPdio83xGUtYAw",
      });
      if (selectedLocation) {
        const directions = new MapboxDirections({
          accessToken:
            "pk.eyJ1Ijoid3VhdmFubjUwNzYiLCJhIjoiY2x4cDF5ZTMxMGQwOTJqcHV2ZXlvYzBybSJ9.S90q1YyODPdio83xGUtYAw",
          unit: "metric",
          profile: "mapbox/driving",
        });
        map.addControl(directions, "top-left");
        directions.setOrigin([currentLocation.lng, currentLocation.lat]);
        directions.setDestination([
          selectedLocation.position.lng,
          selectedLocation.position.lat,
        ]);
      }
    }
  }, [currentLocation, selectedLocation]);
  return (
    <div className="map-wrapper">
      <div className="map-container" ref={mapContainerRef}>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1Ijoid3VhdmFubjUwNzYiLCJhIjoiY2x4cDF5ZTMxMGQwOTJqcHV2ZXlvYzBybSJ9.S90q1YyODPdio83xGUtYAw"
          onMove={(evt) => handleViewportChange(evt.viewState)}
          id="map"
        >
          <NavigationControl />

          {exploreData.map((item) => (
            <Marker
              key={item._id}
              latitude={item.position.lat}
              longitude={item.position.lng}
              offset={[-20, -30]}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
            </Marker>
          ))}

          {friendLists.map((friend) => (
            <Marker
              key={friend._id}
              latitude={friend.position.lat}
              longitude={friend.position.lng}
              offset={[-20, -30]}
            >
              <img
                src={friend.pic}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  border: "2px solid black",
                }}
              />
            </Marker>
          ))}

          {currentLocation && (
            <Marker
              latitude={currentLocation.lat}
              longitude={currentLocation.lng}
              offset={[-20, -20]}
            >
              <img
                src={
                  "https://i.pinimg.com/736x/b3/f9/5e/b3f95e89c1440a5f7652b5662e1c2002.jpg"
                }
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                }}
              />
            </Marker>
          )}

          {selectedLocation && (
            <Marker
              latitude={selectedLocation.position.lat}
              longitude={selectedLocation.position.lng}
              offset={[-20, -30]}
            >
              <img
                src={selectedLocation.imageUrl}
                alt={selectedLocation.name}
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;

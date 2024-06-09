// DBtest.tsx
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
// import UserImage from "../../assets/images/user-map.png";
const users = [
  {
    id: 1,
    name: "User Near Bui Vien",
    location: { lat: 10.7771, lng: 106.6917 },
  },
  {
    id: 2,
    name: "User Near Ben Thanh Market",
    location: { lat: 10.77258, lng: 106.698028 },
  },
  {
    id: 3,
    name: "User Near War Remnants Museum",
    location: { lat: 10.779783, lng: 106.692644 },
  },
];

const places = [
  {
    id: 1,
    name: "War Remnants Museum",
    location: { lat: 10.779783, lng: 106.692644 },
  },
  {
    id: 2,
    name: "Suoi Tien Theme Park",
    location: { lat: 10.866452, lng: 106.802413 },
  },
  {
    id: 3,
    name: "Jade Emperor Pagoda",
    location: { lat: 10.792659, lng: 106.696625 },
  },
];

const apiKey = "AIzaSyApCxLqCsVpq5Ig_9hklh2DZSgWnL8EJEg";

const mapContainerStyle = {
  height: "88vh",
  width: "100%",
};

const zoom = 13;

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const DBtest = ({ center, selectedLocation }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });
  const { user } = ChatState();
  const userId = user._id;

  const [friends, setFriends] = useState<any>([]);
  const [friendLists, setFriendLists] = useState<any>([]);
  const fetchFriend = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);

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
    fetchFriend();
  }, [userId]);
  useEffect(() => {
    if (friends.length > 0) {
      fetchFriendsDetails(friends);
    }
  }, [friends]);
  console.log(friendLists);

  return isLoaded ? (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {/* {users.map((user) => (
          <Marker key={user.id} position={user.location} label={user.name} />
        ))}
        {places.map((place) => (
          <Marker key={place.id} position={place.location} label={place.name} />
        ))}
        {selectedLocation && (
          <Marker
            position={selectedLocation.position}
            label={selectedLocation.name}
          />
        )} */}
        {friendLists.map((friend) => (
          <Marker
            key={friend._id}
            position={{ lat: friend.position.lat, lng: friend.position.lng }}
            label={friend.name}
            icon={{
              url: friend.pic, // replace this with the path to your image
              scaledSize: new window.google.maps.Size(50, 50), // adjust the size as needed
            }}
          />
        ))}
        {selectedLocation && (
          <Marker
            position={selectedLocation.position}
            label={selectedLocation.name}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default DBtest;

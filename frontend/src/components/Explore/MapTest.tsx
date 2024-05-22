import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

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

const apiKey = "AIzaSyDRCoGxmaIjIhWyNxaXGVzYCcUAq4mA7jY";

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

const handleClick = () => {
  // For each user
  users.forEach((user) => {
    // Find places within a 3km square around the user
    const nearbyPlaces = places.filter(
      (place) =>
        Math.abs(user.location.lat - place.location.lat) <= 0.027 &&
        Math.abs(user.location.lng - place.location.lng) <= 0.027
    );

    // If there are any nearby places, display them
    if (nearbyPlaces.length > 0) {
      alert(
        `User ${
          user.name
        } has the following places within a 3km square: ${nearbyPlaces
          .map((place) => place.name)
          .join(", ")}`
      );
    } else {
      alert(`User ${user.name} has no places within a 3km square.`);
    }
  });
};
const DBtest = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  return isLoaded ? (
    <div style={{ height: "80vh", width: "100%" }}>
      <button onClick={handleClick}>Click me</button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: 10.762622, lng: 106.660172 }}
        zoom={zoom}
        onClick={(e) => {
          if (e.latLng) {
            const clickedLat = e.latLng.lat();
            const clickedLng = e.latLng.lng();
            const usersWithin5km = users.filter(
              (user) =>
                getDistanceFromLatLonInKm(
                  clickedLat,
                  clickedLng,
                  user.location.lat,
                  user.location.lng
                ) < 1
            );
            console.log(usersWithin5km);
          }
        }}
      >
        {users.map((user) => (
          <Marker key={user.id} position={user.location} label={user.name} />
        ))}
        {places.map((place) => (
          <Marker key={place.id} position={place.location} label={place.name} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default DBtest;

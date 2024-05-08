// Map.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Replace with your actual data
const locations = [
  { name: "Suối Tiên", position: [10.9802, 106.6367] },
  { name: "Chợ Bến Thành", position: [10.772, 106.6983] },
  { name: "Landmark 81", position: [10.7941, 106.7216] },
  { name: "Đường Sách Nguyễn Văn Bình", position: [10.7799, 106.6993] },
  // Add more locations here...
];

const Map: React.FC = () => {
  return (
    <div style={{ height: "88vh", width: "30vw", overflow: "hidden" }}>
      <MapContainer
        center={locations[0].position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

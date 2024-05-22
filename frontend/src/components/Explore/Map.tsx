// Map.tsx
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Location } from "./LocationDB"; // Import Location type

interface MapProps {
  center: { lat: number; lng: number };
  selectedLocation: Location | null;
  locations: Location[]; // Add locations prop
}

const Map: React.FC<MapProps> = ({ center, selectedLocation, locations }) => {
  // Add locations to props
  const apiKey = "AIzaSyBNCZWA8OpV48m7sML5N8v68nRQyCu6NE0";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  const mapContainerStyle = {
    height: "88vh",
    width: "100%",
  };

  const zoom = 13;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
    >
      {locations.map((location, i) => (
        <Marker key={i} position={location.position} title={location.name} />
      ))}
      {selectedLocation && (
        <Marker
          position={selectedLocation.position}
          title={selectedLocation.name}
          // icon={{
          //   url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          // }}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;

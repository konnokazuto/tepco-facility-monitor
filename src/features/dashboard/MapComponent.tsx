import React from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const areas = [
    {
      coords: [
        [35.6895, 139.6917],
        [35.6895, 139.7017],
        [35.6795, 139.7017],
        [35.6795, 139.6917]
      ],
      image: "area1.jpg"
    },
    {
      coords: [
        [35.6895, 139.7017],
        [35.6895, 139.7117],
        [35.6795, 139.7117],
        [35.6795, 139.7017]
      ],
      image: "area2.jpg"
    }
  ];

  const handleClick = (image) => {
    alert("詳細画像: " + image);
  };

  return (
    <MapContainer center={[35.6895, 139.6917]} zoom={13} style={{ height: "600px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {areas.map((area, index) => (
        <Polygon
          key={index}
          positions={area.coords}
          color="blue"
          eventHandlers={{
            click: () => handleClick(area.image)
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;

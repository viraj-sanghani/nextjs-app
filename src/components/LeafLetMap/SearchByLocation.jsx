"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  loading: () => <div className="map-container" style={{ height: 450 }}></div>,
  ssr: false,
});

export default function SearchByLocation({ handleLocationChange, radius = 5 }) {
  const [circleLocation, setCircleLocation] = useState(null);

  const handleMapClick = (coords) => {
    setCircleLocation(coords);
    handleLocationChange(coords);
  };

  return (
    <div style={{ width: "100%", marginBottom: 20 }}>
      <Map
        style={{ height: "450px", width: "100%" }}
        hideCurLocationIcon={true}
        handleMapClick={handleMapClick}
        circleLocation={circleLocation}
        handleCurLocation={handleMapClick}
        circleRadius={radius * 1000}
      />
    </div>
  );
}

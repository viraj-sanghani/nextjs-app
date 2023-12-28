"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  loading: () => <div className="map-container" style={{ height: 400 }}></div>,
  ssr: false,
});

export default function LocationPin({
  setLocationChange,
  location = null,
  search = "",
}) {
  const [pinnedLocation, setPinnedLocation] = useState(null);

  const handleMapClick = (coords) => {
    setPinnedLocation(coords);
    setLocationChange(coords);
  };

  return useMemo(() => {
    return (
      <div style={{ width: "100%", marginBottom: 30 }}>
        <Map
          style={{ height: "400px", width: "100%" }}
          hideCurLocationIcon={true}
          handleMapClick={handleMapClick}
          handleCurLocation={handleMapClick}
          pinnedLocation={pinnedLocation || location}
          center={location}
          search={search}
        />
      </div>
    );
  }, [pinnedLocation, location, search]);
}

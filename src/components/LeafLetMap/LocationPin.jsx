"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"));

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
    return typeof window === "undefined" ? null : (
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

"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"), {
  loading: () => <div className="map-container" style={{ height: 300 }}></div>,
  ssr: false,
});

export default function NearByPlace({ location = null }) {
  return (
    <div>
      <Map
        style={{ height: "300px", width: "100%" }}
        hideCurLocationIcon={true}
        pinnedLocation={location}
        center={location}
      />
    </div>
  );
}

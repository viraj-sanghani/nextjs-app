"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("./Map"));

export default function NearByPlace({ location = null }) {
  if (typeof window === "undefined") return null;

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

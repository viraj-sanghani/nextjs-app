"use client";

import PropertyList from "./PropertyList";
import PropertyMap from "@/components/GoogleMap/PropertyMap";
import UpdateData from "./UpdateData";

function ResultData() {
  return (
    <>
      <UpdateData />
      <div className="s-r-list-con">
        <PropertyList />
        <PropertyMap />
      </div>
    </>
  );
}

export default ResultData;

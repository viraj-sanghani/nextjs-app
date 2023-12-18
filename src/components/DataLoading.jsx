import React from "react";
import Loading from "./Loading";

function DataLoading({ height }) {
  return (
    <div className="data-loader" style={{ height }}>
      <Loading color="var(--color-2)" />
    </div>
  );
}

export default DataLoading;

"use client";

import React from "react";
import Filter from "@/components/Filter";
import ResultData from "./ResultData";

function Result() {
  return (
    <div className="search-result-con">
      <div className="search-r-wrap max-width">
        <Filter />
        <ResultData />
      </div>
    </div>
  );
}

export default Result;

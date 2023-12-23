"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropertySwiper from "@/components/Swiper/PropertySwiper";
import { call, getRecommendationProperty } from "@/services/api";

function Recommendation() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [recommendation, setRecommendation] = useState([]);

  const fetchRecommendationProp = async () => {
    try {
      const res = await call(getRecommendationProperty());
      setRecommendation(res.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    isLoggedIn && fetchRecommendationProp();
  }, [isLoggedIn]);

  return (
    recommendation.length > 0 && (
      <>
        <div className="s-section-title max-width">
          <h2>Recommended Properties</h2>
        </div>

        <PropertySwiper data={recommendation} />
      </>
    )
  );
}

export default Recommendation;

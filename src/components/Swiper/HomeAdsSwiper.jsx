"use client";

import { SwiperSlide } from "swiper/react";
import SwiperComp from "./Swiper";
import AdvertiseCard from "../Cards/AdvertiseCard";

const HomeAdsSwiper = ({ data }) => {
  console.log(data);
  return (
    <div className="home-ads-container">
      <div className="max-width home-advertise-wrap">
        {data.map((ele, i) => (
          <AdvertiseCard
            key={i}
            data={ele}
            hideCompare={true}
            hideShortlist={true}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeAdsSwiper;

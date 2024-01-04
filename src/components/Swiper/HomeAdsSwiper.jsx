"use client";

import { SwiperSlide } from "swiper/react";
import SwiperComp from "./Swiper";
import AdvertiseCard from "../Cards/AdvertiseCard";

const HomeAdsSwiper = ({ data }) => {
  return (
    <div className="home-ads-container">
      <SwiperComp
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        className="swiper-box max-width"
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((ele, i) => (
          <SwiperSlide key={i}>
            <AdvertiseCard data={ele} hideCompare={true} hideShortlist={true} />
          </SwiperSlide>
        ))}
      </SwiperComp>
    </div>
  );
};

export default HomeAdsSwiper;

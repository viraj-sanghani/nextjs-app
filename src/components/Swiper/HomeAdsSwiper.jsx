"use client";

import { SwiperSlide } from "swiper/react";
import SwiperComp from "./Swiper";
import AdvertiseCard from "../Cards/AdvertiseCard";

const HomeAdsSwiper = ({ data }) => {
  return (
    <div className="home-ads-container">
      <SwiperComp
        slidesPerView={"auto"}
        spaceBetween={0}
        navigation={true}
        className="swiper-box max-width home-advertise-wrap"
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

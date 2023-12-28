"use client";

import { SwiperSlide } from "swiper/react";
import MapCard from "../Cards/MapCard";
import SwiperComp from "./Swiper";

const MapSwiper = ({ data }) => {
  return (
    data.length > 0 && (
      <SwiperComp
        slidesPerView={1}
        spaceBetween={2}
        navigation={true}
        className="map-swiper-con"
      >
        {data.map((ele, i) => (
          <SwiperSlide key={i} style={{ padding: 0 }}>
            <MapCard
              data={ele}
              mobile={true}
              hideShare={true}
              hideShortlist={true}
            />
          </SwiperSlide>
        ))}
      </SwiperComp>
    )
  );
};

export default MapSwiper;

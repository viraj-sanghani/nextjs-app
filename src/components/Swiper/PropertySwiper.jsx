"use client";

import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import SwiperComp from "./Swiper";
import PropertyCard from "@/components/Cards/PropertyCard";

const PropertySwiper = ({ data, className = "" }) => {
  const { compareProperty } = useSelector((state) => state.activity);

  return (
    data && (
      <div className={className}>
        <SwiperComp
          slidesPerView={"auto"}
          spaceBetween={0}
          navigation={true}
          className="swiper-box max-width property-swiper"
        >
          {data.map((ele, i) => (
            <SwiperSlide key={i}>
              <PropertyCard
                mobile={true}
                data={ele}
                isCompare={compareProperty.includes(ele.id)}
                hideShortlist={true}
              />
            </SwiperSlide>
          ))}
        </SwiperComp>
      </div>
    )
  );
};

export default PropertySwiper;

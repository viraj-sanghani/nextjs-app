"use client";

import React from "react";
import { Swiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const SwiperComp = ({
  loop = false,
  navigation = false,
  slidesPerView = 1,
  breakpoints = {},
  spaceBetween = 10,
  grabCursor = true,
  autoplay = false,
  className = "",
  style = {},
  children,
}) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      breakpoints={breakpoints}
      navigation={navigation}
      loop={loop}
      grabCursor={grabCursor}
      spaceBetween={spaceBetween}
      autoplay={autoplay}
      modules={[Autoplay, Navigation]}
      style={style}
      className={className}
    >
      {children}
    </Swiper>
  );
};

export default SwiperComp;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import SwiperComp from "./Swiper";

const HomeBannerSwiper = ({ data, desktop }) => {
  const [isDesktop, setIsDesktop] = useState(desktop);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SwiperComp slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
      {data.map((img, i) => (
        <SwiperSlide key={i}>
          <a href={img?.redirect} target="_blank">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_URL}/banner/${
                isDesktop ? "desktop" : "mobile"
              }/${img[isDesktop ? "desktop" : "mobile"]}`}
              width={isDesktop ? 1920 : 1024}
              height={isDesktop ? 300 : 300}
              alt="Banner"
              priority={true}
            />
          </a>
        </SwiperSlide>
      ))}
    </SwiperComp>
  );
};

export default HomeBannerSwiper;

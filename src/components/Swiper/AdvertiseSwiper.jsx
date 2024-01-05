"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { adsImg, formatNumber, timeAgo } from "@/utils/helper";
import { getAds } from "@/services/api";
import SwiperComp from "./Swiper";

const AdvertiseSwiper = ({ title, category }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAds(category);
        setAds(res.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchAds();
  }, []);

  return (
    ads.length > 0 && (
      <div className="advertise-container">
        <div className="swiper-container">
          <h2 className="ad-heading">{title}</h2>
          <SwiperComp
            slidesPerView={"auto"}
            spaceBetween={10}
            navigation={true}
            className="ad-swiper-box property-swiper"
          >
            {ads.map((ele, i) => (
              <SwiperSlide key={i}>
                <div className="advertise-card-wrap">
                  <Link
                    href={{
                      pathname: ele?.url,
                    }}
                    target="_blank"
                  >
                    <div className="card-box">
                      <div className="card-image-wrap">
                        <Image
                          src={adsImg(ele?.img)}
                          height={150}
                          width={150}
                          alt={ele?.meta_title.replaceAll(" | ", ", ")}
                        />
                      </div>
                      <div className="card-content">
                        {ele?.project_name && (
                          <h4 className="card-title">
                            {ele.project_name}{" "}
                            {ele?.postFor === "CP" && "(Only CP Group)"}
                          </h4>
                        )}
                        <p className="prop-type">
                          {ele?.bedroom && ele?.bedroom + " BHK"}{" "}
                          {ele?.property_type}
                        </p>
                        <p className="prop-at">
                          {ele?.locality}, {ele?.city}
                        </p>
                        <h5 className="prop-amt">
                          ₹{" "}
                          {formatNumber(
                            ele?.exp_price || ele?.monthly_rent || 0
                          )}{" "}
                          {ele?.monthly_rent ? <small>/ month</small> : ""}
                        </h5>
                        <p className="prop-post-ago">{timeAgo(ele?.date)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </SwiperComp>
        </div>
      </div>
    )
  );
};

export default AdvertiseSwiper;

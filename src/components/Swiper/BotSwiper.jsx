"use client";

import Image from "next/image";
import Link from "next/link";
import { SwiperSlide } from "swiper/react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import SwiperComp from "./Swiper";
import { formatNumber, propertySmallImg, timeAgo } from "@/utils/helper";
import { setContact } from "@/redux/reducers/appReducer";

const BotSwiper = ({ data }) => {
  const dispatch = useDispatch();

  const openConnect = (item) => {
    dispatch(setContact({ open: true, data: item }));
  };

  return (
    <SwiperComp
      slidesPerView={"auto"}
      spaceBetween={10}
      loop={true}
      navigation={true}
    >
      {data.map((item, i) => (
        <SwiperSlide key={i}>
          <div className="property-item">
            <div className="property-img">
              <Image
                src={propertySmallImg(item.image)}
                height={150}
                width={200}
                alt={item?.meta_title.replaceAll(" | ", ", ")}
              />
            </div>
            <h4 className="property-price">
              ₹ {formatNumber(item?.exp_price || item?.monthly_rent || 0)}{" "}
              {item?.monthly_rent ? <small>/ month</small> : ""}
            </h4>
            <div className="property-title">{item.project_name}</div>
            <div className="property-sub-title">
              {item?.bedroom && item?.bedroom + " BHK"} {item?.property_type},{" "}
              {item?.locality}, {item?.city}
            </div>
            <div className="property-post-by">
              Posted By: {item.iam}
              <span>{timeAgo(item.date)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 10,
                gap: 20,
              }}
            >
              <Link
                href={{
                  pathname: item?.url,
                }}
                target="_blank"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button variant="contained" size="small">
                  See Details
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="small"
                onClick={() => openConnect(item)}
              >
                View Number
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </SwiperComp>
  );
};

export default BotSwiper;

"use client";

import { SwiperSlide } from "swiper/react";
import SwiperComp from "./Swiper";
import AdvertiseCard from "../Cards/AdvertiseCard";

const HomeAdsSwiper = ({ data: d }) => {
  console.log(d);
  const data = [
    {
      id: 15,
      catId: 1,
      img: "345691698733822106.jpg",
      createdAt: "2023-10-31T06:30:22.000Z",
      propertyId: 2380,
      catName: "Trending",
      forr: "Sale",
      date: "2023-10-20T07:57:24.000Z",
      property_type: "Flat/Apartment",
      postFor: "B2C",
      iam: "Owner",
      project_name: "Horizon Complex",
      locality: "Mira Road",
      city: "Mumbai",
      exp_price: 5950000,
      monthly_rent: 0,
      bedroom: "2",
      bathroom: "2",
      washrooms: "",
      area_unit: "Sq-ft",
      carpet_area: "448",
      super_area: "700",
      plot_length: "",
      plot_breadth: "",
      prop_availability: "Under Construction",
      ownership_status: "Freehold",
      open_side: "",
      url: "https://housingmagic.com/property/horizon-complex-2-bhk-flat-apartment-for-sale-in-mira-road-mumbai-2380",
      meta_title:
        "Horizon Complex | 2 BHK | Flat/Apartment | Sale in Mira Road, Mumbai",
      isActive: 1,
    },
    {
      id: 16,
      catId: 1,
      img: "276381698733844479.jpg",
      createdAt: "2023-10-31T06:30:44.000Z",
      propertyId: 2382,
      catName: "Trending",
      forr: "Sale",
      date: "2023-10-23T06:59:29.000Z",
      property_type: "Flat/Apartment",
      postFor: "B2C",
      iam: "Owner",
      project_name: "Horizon Complex",
      locality: "Mira Road",
      city: "Mumbai",
      exp_price: 6332000,
      monthly_rent: 0,
      bedroom: "2",
      bathroom: "2",
      washrooms: "",
      area_unit: "Sq-ft",
      carpet_area: "459",
      super_area: "745",
      plot_length: "",
      plot_breadth: "",
      prop_availability: "Under Construction",
      ownership_status: "Freehold",
      open_side: "",
      url: "https://housingmagic.com/property/horizon-complex-2-bhk-flat-apartment-for-sale-in-mira-road-mumbai-2382",
      meta_title:
        "Horizon Complex | 2 BHK | Flat/Apartment | Sale in Mira Road, Mumbai",
      isActive: 1,
    },
    {
      id: 17,
      catId: 1,
      img: "248391698733863160.jpg",
      createdAt: "2023-10-31T06:31:03.000Z",
      propertyId: 2383,
      catName: "Trending",
      forr: "Sale",
      date: "2023-10-23T07:12:33.000Z",
      property_type: "Flat/Apartment",
      postFor: "B2C",
      iam: "Owner",
      project_name: "Horizon Complex",
      locality: "Mira Road",
      city: "Mumbai",
      exp_price: 7225000,
      monthly_rent: 0,
      bedroom: "2",
      bathroom: "2",
      washrooms: "",
      area_unit: "Sq-ft",
      carpet_area: "543",
      super_area: "850",
      plot_length: "",
      plot_breadth: "",
      prop_availability: "Under Construction",
      ownership_status: "Freehold",
      open_side: "",
      url: "https://housingmagic.com/property/horizon-complex-2-bhk-flat-apartment-for-sale-in-mira-road-mumbai-2383",
      meta_title:
        "Horizon Complex | 2 BHK | Flat/Apartment | Sale in Mira Road, Mumbai",
      isActive: 1,
    },
    {
      id: 18,
      catId: 1,
      img: "767301698733887789.jpg",
      createdAt: "2023-10-31T06:31:27.000Z",
      propertyId: 2384,
      catName: "Trending",
      forr: "Sale",
      date: "2023-10-23T07:22:55.000Z",
      property_type: "Flat/Apartment",
      postFor: "B2C",
      iam: "Owner",
      project_name: "Horizon Complex",
      locality: "Mira Road",
      city: "Mumbai",
      exp_price: 5142000,
      monthly_rent: 0,
      bedroom: "1",
      bathroom: "1",
      washrooms: "",
      area_unit: "Sq-ft",
      carpet_area: "381",
      super_area: "605",
      plot_length: "",
      plot_breadth: "",
      prop_availability: "Under Construction",
      ownership_status: "Freehold",
      open_side: "",
      url: "https://housingmagic.com/property/horizon-complex-1-bhk-flat-apartment-for-sale-in-mira-road-mumbai-2384",
      meta_title:
        "Horizon Complex | 1 BHK | Flat/Apartment | Sale in Mira Road, Mumbai",
      isActive: 1,
    },
  ];
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

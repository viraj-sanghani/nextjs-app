import React, { Component } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../LazyImage";
import { adsImg, formatNumber, timeAgo } from "../../utils/helper";
import { call, getAds } from "../../redux/axios";

class AdvertiseSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SwiperComp: null,
      SwiperSlide: null,
      Navigation: null,
      ads: [],
    };
  }

  fetchAds = async () => {
    try {
      const res = await call(getAds(this.props.category));
      this.setState({ ads: res.data });
    } catch (err) {
      console.log("error", err);
    }
  };

  componentDidMount() {
    import("swiper/react").then((module) => {
      const { Swiper: SwiperComp, SwiperSlide } = module;
      this.setState({ SwiperComp, SwiperSlide });
    });

    import("swiper").then((module) => {
      const { Navigation } = module;
      this.setState({ Navigation });
    });

    this.fetchAds();
  }

  render() {
    const { SwiperComp, SwiperSlide, Navigation } = this.state;

    if (
      typeof window !== "undefined" &&
      SwiperComp &&
      SwiperSlide &&
      Navigation
    ) {
      return (
        this.state.ads.length > 0 && (
          <div className="advertise-container">
            <div className="swiper-container">
              <h2 className="ad-heading">{this.props?.title}</h2>
              <SwiperComp
                slidesPerView={"auto"}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="ad-swiper-box"
              >
                {this.state.ads.map((ele, i) => (
                  <SwiperSlide key={i}>
                    <div className="advertise-card-wrap">
                      <Link
                        to={{
                          pathname: ele?.url,
                        }}
                        target="_blank"
                      >
                        <div className="card-box">
                          <div className="card-image-wrap">
                            <LazyImage
                              src={adsImg(ele?.img)}
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

                            {/* <p className="prop-post-by">by Amrut Infra</p> */}
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
                            <p className="prop-post-ago">
                              {timeAgo(ele?.date)}
                            </p>
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
    } else {
      return <></>;
    }
  }
}

export default AdvertiseSwiper;

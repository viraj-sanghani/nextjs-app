import React, { Component } from "react";
import { Link } from "react-router-dom";
import { formatNumber, propertySmallImg, timeAgo } from "../../utils/helper";
import { setContact } from "./../../redux/reducers/appReducer";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import LazyImage from "./../LazyImage";
class BotSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SwiperComp: null,
      SwiperSlide: null,
      Navigation: null,
      Pagination: null,
    };
  }
  componentDidMount() {
    import("swiper/react").then((module) => {
      const { Swiper: SwiperComp, SwiperSlide } = module;
      this.setState({ SwiperComp, SwiperSlide });
    });

    import("swiper").then((module) => {
      const { Navigation, Pagination } = module;
      this.setState({ Navigation, Pagination });
    });
  }

  render() {
    const { SwiperComp, SwiperSlide, Navigation, Pagination } = this.state;

    const openConnect = (item) => {
      this.props.dispatch(setContact({ open: true, data: item }));
    };

    if (
      typeof window !== "undefined" &&
      SwiperComp &&
      SwiperSlide &&
      Navigation
    ) {
      return (
        <SwiperComp
          grabCursor={true}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {this.props.data.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="property-item">
                <div className="property-img">
                  <LazyImage
                    src={propertySmallImg(item.image)}
                    alt={item?.meta_title.replaceAll(" | ", ", ")}
                  />
                </div>
                <h4 className="property-price">
                  ₹ {formatNumber(item?.exp_price || item?.monthly_rent || 0)}{" "}
                  {item?.monthly_rent ? <small>/ month</small> : ""}
                </h4>
                <div className="property-title">{item.project_name}</div>
                <div className="property-sub-title">
                  {item?.bedroom && item?.bedroom + " BHK"}{" "}
                  {item?.property_type}, {item?.locality}, {item?.city}
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
                    to={{
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
    } else {
      return <></>;
    }
  }
}

export default connect()(BotSwiper);

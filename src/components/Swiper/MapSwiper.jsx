import React, { Component } from "react";
import { connect } from "react-redux";
import MapCard from "../Cards/MapCard";

class MapSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SwiperComp: null,
      SwiperSlide: null,
      Navigation: null,
    };
  }
  componentDidMount() {
    import("swiper/react").then((module) => {
      const { Swiper: SwiperComp, SwiperSlide } = module;
      this.setState({ SwiperComp, SwiperSlide });
    });

    import("swiper").then((module) => {
      const { Navigation } = module;
      this.setState({ Navigation });
    });
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
        this.props.data && (
          <SwiperComp
            slidesPerView={1}
            spaceBetween={2}
            navigation={true}
            modules={[Navigation]}
            className="map-swiper-con"
          >
            {this.props.data.map((ele, i) => (
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
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    compareProperty: state.activity.compareProperty,
  };
};

export default connect(mapStateToProps)(MapSwiper);

import React, { Component } from "react";
import PropertyCard from "../Cards/PropertyCard";
import { connect } from "react-redux";

class HomeSwiper extends Component {
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
    const { compareProperty } = this.props;

    if (
      typeof window !== "undefined" &&
      SwiperComp &&
      SwiperSlide &&
      Navigation
    ) {
      return (
        this.props.data && (
          <div className="swiper-container">
            <SwiperComp
              slidesPerView={"auto"}
              spaceBetween={20}
              navigation={true}
              modules={[Navigation]}
              className="swiper-box max-width"
            >
              {this.props.data.map((ele, i) => (
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

export default connect(mapStateToProps)(HomeSwiper);

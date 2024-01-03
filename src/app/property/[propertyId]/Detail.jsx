"use client";

import { lazy, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import icons from "@/utils/icons";
import amenitiesIcon from "@/utils/amenities";
import SiteVisitForm from "@/components/SiteVisitForm";
import { setContact, setShare } from "@/redux/reducers/appReducer";
import NearByPlace from "@/components/LeafLetMap/NearByPlace";
import {
  formatNumber,
  propertyBrochure,
  propertyOriginalImg,
  propertySmallImg,
} from "@/utils/helper";
import PropertySwiper from "@/components/Swiper/PropertySwiper";
import AdvertiseSwiper from "@/components/Swiper/AdvertiseSwiper";
import AdvertiseCard from "@/components/Cards/AdvertiseCard";
import { toggleCompare } from "@/redux/reducers/activityReducer";
import { toggleShortlist } from "@/redux/reducers/filterReducer";
import { shortlistToggle } from "@/redux/actions/activity";
import {
  call,
  addViewedData,
  getAds,
  getSimilarProperty,
} from "@/services/api";
const Gallery = lazy(() => import("./Gallery"));

const overview = (label, value, icon = null) => {
  return (
    value != "" && (
      <div className="ov-d-item">
        <div className="ov-d-i-con">
          <div className="ov-d-value">
            {icon && icons[icon]} {value}
          </div>
          <div className="ov-d-title">{label}</div>
        </div>
      </div>
    )
  );
};

const detail = (label, value) => {
  return (
    value != "" && (
      <div className="prop-add-item">
        <span className="prop-add-d-t">{label}:</span>
        <span>{value}</span>
      </div>
    )
  );
};

const sectionNames = ["Home", "Overview", "Location", "More Details"];

const PropertyDetail = ({ data, id }) => {
  const dispatch = useDispatch();
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [similarProperty, setSimilarProperty] = useState([]);
  const [sections, setSections] = useState(
    data.amenities.length > 0 ? [...sectionNames, "Features"] : sectionNames
  );
  const [ads, setAds] = useState([]);
  const [activeSection, setActiveSection] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { compareProperty } = useSelector((state) => state.activity);

  const handleToggleCompare = () => {
    const propData = {
      id: id,
      img: data.image,
      url: data?.url,
      title: data.project_name,
      desc: `₹ ${formatNumber(data?.exp_price || data?.monthly_rent || 0)} ${
        data?.monthly_rent ? "/ month" : ""
      }`,
    };
    dispatch(toggleCompare(propData));
  };

  const handleChangeShortlist = (item) => {
    dispatch(shortlistToggle(item));
    dispatch(toggleShortlist({ id: item.id }));
    setIsShortlisted(!isShortlisted);
  };

  const fetchAds = async () => {
    try {
      const res = await call(getAds(1));
      setAds(res.data);
    } catch (err) {}
  };

  const fetchSimilarProperty = async (id) => {
    try {
      const res = await call(getSimilarProperty(id));
      setSimilarProperty(res.data);
    } catch (err) {}
  };

  const handleScroll = () => {
    const sectionOffsets = sections.map((section) => {
      const element = document.getElementById(section.replace(" ", ""));
      return element ? element.offsetTop : 0;
    });

    const scrollTop = window.scrollY;
    const scrollPosition = scrollTop + window.innerHeight * 0.25;
    let activeSection = 0;

    for (let i = sectionOffsets.length - 1; i >= 0; i--) {
      if (scrollPosition >= sectionOffsets[i]) {
        activeSection = i;
        break;
      }
    }

    setActiveSection(activeSection);
  };

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      const scrollToOffset = sectionElement.offsetTop - 150;
      window.scrollTo({ top: scrollToOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const updateData = async () => {
    try {
      fetchSimilarProperty(id);
      fetchAds();
      const res = await call(addViewedData({ propId: id }));
      setIsShortlisted(res?.isShortlisted);
    } catch (err) {}
  };

  useEffect(() => {
    id && updateData();
  }, [data]);

  const nearByMap = useMemo(() => {
    return data?.latitude && data?.longitude ? (
      <div className="prop-map-con">
        <NearByPlace location={{ lat: data.latitude, lng: data.longitude }} />
      </div>
    ) : null;
  }, [data]);

  const handleGalleryOpen = () => {
    setGalleryOpen(!galleryOpen);
  };

  return (
    <>
      <div className="property-detail-con">
        <div className="prop-d-sticky-header">
          <div className="prop-d-com-header">
            {sections.map((section, index) => (
              <div
                key={index}
                className={
                  activeSection === index
                    ? "prop-d-header-item active"
                    : "prop-d-header-item"
                }
                onClick={() => scrollToSection(section.replace(" ", ""))}
              >
                {section}
              </div>
            ))}
          </div>
        </div>

        <div className="max-width prop-box">
          <div className="prop-left-side">
            <div className="prop-heading" id="Home">
              <div>
                <h4>
                  {data?.project_name && (
                    <>
                      {data.project_name}
                      {data?.postFor === "CP" && " (Only CP Group)"},
                    </>
                  )}{" "}
                  {data?.bedroom && data?.bedroom + " BHK, "}{" "}
                  {data?.property_type} in {data?.locality}, {data?.city} in ₹{" "}
                  {formatNumber(data?.exp_price || data?.monthly_rent || 0)}
                  {data?.monthly_rent ? <small> / month</small> : ""}
                </h4>
                {data?.rera_id && (
                  <div className="prop-heading-rera-no">
                    Rera No : {data.rera_id}
                  </div>
                )}
              </div>
              <div className="head-btns">
                <span
                  className="share-icon"
                  title="Share"
                  onClick={() =>
                    dispatch(
                      setShare({
                        open: true,
                        url: data?.url,
                      })
                    )
                  }
                >
                  {icons.share}
                </span>
                <span
                  className="shortlist-icon"
                  title={
                    isShortlisted ? "Remove from shortlist" : "Add to shortlist"
                  }
                  onClick={() => handleChangeShortlist(data)}
                >
                  {isShortlisted ? icons.starFilled : icons.star}
                </span>
                <span
                  className={`compare-icon ${
                    compareProperty.includes(id) ? "active" : ""
                  }`}
                  title={
                    compareProperty.includes(id)
                      ? "Remove from compare"
                      : "Add to compare"
                  }
                  onClick={handleToggleCompare}
                >
                  {icons.compare}
                </span>
              </div>
            </div>

            <div className="prop-image-wrap" onClick={handleGalleryOpen}>
              <Image
                src={propertyOriginalImg(data.image)}
                alt="Property Main Image"
                height={500}
                width={900}
                priority={true}
              />
            </div>

            {data?.brochure && (
              <a href={propertyBrochure(data.brochure)} target="_blank">
                <Button sx={{ mt: 3 }} variant="contained">
                  Download Brochure
                </Button>
              </a>
            )}

            <div className="prop-section" id="Overview">
              <div className="prop-sec-title">Overview</div>
              <div className="ov-detail">
                {overview("Property Type", data?.property_type)}
                {overview("Property For", data?.forr)}
                {overview("Bedrooms", data?.bedroom, "bedroom")}
                {overview("Bathrooms", data?.bathroom, "bathroom")}
                {/* {overview("Balconies", data?.balconies, "")} */}
                {/* {overview("Floor No", data?.floor_no, "")} */}
                {overview("Total Floors", data?.total_floor, "")}
                {overview("Furnished Status", data?.furnish_status, "")}
                {overview("Floors Allowed", data?.floors_alloww, "")}
                {overview("No Of Open Sides", data?.open_side, "")}
                {overview("Width Of Road Facing", data?.width_road, "")}
                {overview("Any Construction Done", data?.any_con, "")}
                {overview("Boundary Wall Made", data?.wall_made, "")}
                {overview("Is In A Gated Colony", data?.colony, "")}
                {overview("Washrooms", data?.washrooms, "")}
                {overview("Personal Washroom", data?.per_washroom, "")}
                {overview("Pantry Cafeteria", data?.pantry, "")}
                {overview("Modify Interiors", data?.willing_to, "")}
                {overview("Lockin Period", data?.lockin, "")}
                {overview("Corner Shop", data?.corner_shop, "")}
                {overview("isMainRoadFacing", data?.main_road, "")}
                {overview("Corner Showroom", data?.corner_showroom, "")}
                {overview(data?.area_unit, data?.carpet_area, "area")}
                {overview("Car Parking", data?.car_parking, "garage")}
                {overview("Multiple Unit Available", data?.multi_unit, "")}
              </div>
            </div>

            {data?.youtubeLink && (
              <div className="prop-section">
                <div className="prop-sec-title">Property Video</div>
                <div className="p-youtube-v-wrap">
                  <LiteYouTubeEmbed
                    iframeClass="p-youtube-v-frame"
                    id={data?.youtubeLink.split("/").at(-1).split("?")[0]}
                  />
                </div>
              </div>
            )}

            <div className="prop-section" id="Location">
              <div className="prop-sec-title">Location</div>
              <div className="prop-add-con">
                <div>
                  <span className="prop-add-d-t">Address :</span>
                </div>
                {data?.address} in {data?.locality}, {data?.city}.
              </div>
              <div className="prop-add-con">
                <div>
                  <span className="prop-add-d-t">Near By :</span>
                </div>
                {`${data?.locality2 ? data?.locality2 + ", " : ""} ${
                  data?.locality3 ? data?.locality3 + ", " : ""
                } ${data?.locality4 ? data?.locality4 + ", " : ""} ${
                  data?.locality5 ? data?.locality5 : ""
                }`.trim()}
              </div>

              {nearByMap}
            </div>

            <div className="prop-section prop-details" id="MoreDetails">
              <div className="prop-sec-title">More Details</div>
              <div className="prop-add-con">
                {detail("Property ID", "P" + id)}
                {detail("Society/Project Name", data?.project_name)}
                {detail("Property For", `${data?.forr}`)}
                {detail(
                  "Super Area",
                  data?.super_area
                    ? `${data?.super_area} ${data?.area_unit}`
                    : ""
                )}
                {detail(
                  "Builtup Area",
                  data?.built_area
                    ? `${data?.built_area} ${data?.area_unit}`
                    : ""
                )}
                {detail(
                  "Carpet Area",
                  data?.carpet_area
                    ? `${data?.carpet_area} ${data?.area_unit}`
                    : ""
                )}
                {detail(
                  "Covered Area",
                  data?.covered_area
                    ? `${data?.covered_area} ${data?.area_unit}`
                    : ""
                )}
                {detail(
                  "Width Of Entrance",
                  data?.width_entrace
                    ? `${data?.width_entrace} ${data?.area_unit}`
                    : ""
                )}
                {detail(
                  "Plot Area",
                  data?.plot_area ? `${data?.plot_area} ${data?.area_unit}` : ""
                )}
                {detail(
                  "Plot Length",
                  data?.plot_length
                    ? `${data?.plot_length} ${data?.area_unit}`
                    : ""
                )}
                {detail(
                  "Plot Breadth",
                  data?.plot_breadth
                    ? `${data?.plot_breadth} ${data?.area_unit}`
                    : ""
                )}
                {detail("Is Corner Plot", data?.corner)}
                {detail("Listing Type", data?.transaction_type)}
                {detail("Property Status", data?.prop_availability)}
                {detail(
                  "Possession Starts",
                  `${moment(data?.avai_from_year).format("MMM YYYY")}`
                )}
                {detail("Age Of Construction", data?.age_of_con)}
                {detail("Expected Price", data?.exp_price)}
                {detail("Price Per Sqft", data?.price_per)}
                {detail("Price Per SqYrd", data?.price_per_sqyrd)}
                {/* {detail("Other Charges", data?.otc_chrg)} */}
                {detail(
                  "Stamp Duty And Registration Charges",
                  data?.registration_charge
                )}
                {/* {detail("Booking Or Token Amount", data?.booking_amt)} */}
                {/* {detail("Maintenance Charge", data?.maintainance)} */}
                {detail("Maintenance Per", data?.per)}
                {detail("Monthly Rent", data?.monthly_rent)}
                {detail(
                  "Electricity And Water Charges",
                  data?.electricity_water
                )}
                {detail("Deposit Amount", data?.security_amt)}
                {detail("Overlooking", data?.overlookng)}
                {detail("Availability Of Water", data?.avail_water)}
                {detail("Status Of Electricity", data?.electricity)}
                {detail("Ownership Status", data?.ownership_status)}
                {detail("Plot Approval Authority", data?.appr_authority)}
                {detail("Approved By", data?.approved_by)}
                {detail(
                  "Connectivity",
                  data?.connectivity
                    ? data?.connectivity.split(",").join(", ")
                    : ""
                )}
                {detail(
                  "Within 2 km",
                  data?.connectivity_within
                    ? data?.connectivity_within.split(",").join(", ")
                    : ""
                )}
                {detail(
                  "Within 5 km",
                  data?.conn_within1
                    ? data?.conn_within1.split(",").join(", ")
                    : ""
                )}
                {detail(
                  "Within 10 km",
                  data?.conn_within2
                    ? data?.conn_within2.split(",").join(", ")
                    : ""
                )}
                {detail("Flooring", data?.flooring)}
              </div>
            </div>

            {data?.int_prop_detail && (
              <div className="prop-section">
                <div className="prop-sec-title">About Project</div>
                <div className="about-prop-content">
                  {data?.int_prop_detail}
                </div>
              </div>
            )}

            {Array.isArray(data.amenities) && data.amenities.length > 0 && (
              <div className="prop-section" id="Features">
                <div className="prop-sec-title">Features</div>
                <div className="prod-features-con">
                  {data?.amenities.map(
                    (ele, i) =>
                      ele && (
                        <div className="p-feature-item" key={i}>
                          {amenitiesIcon[ele] || amenitiesIcon["common"]}
                          <span>{ele}</span>
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {data.blogs &&
              data.blogs.map((blog, i) => (
                <div className="prop-section" key={i}>
                  <div className="prop-sec-title prop-sec-blog-title">
                    {blog?.title}
                  </div>
                  <div className="about-prop-content">{blog?.meta_desc}</div>
                </div>
              ))}
          </div>

          <div className="prop-right-side">
            <Button
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              onClick={handleToggleCompare}
            >
              {compareProperty.includes(id)
                ? "Remove from compare"
                : "Add to compare"}
            </Button>
            <div className="prop-cont-box">
              <div className="prop-cont-title">Contact</div>
              <div className="prop-cont-details">
                <h4>POSTED BY {data?.iam}</h4>
                <p>{data?.name}</p>
                <p>{data?.email}</p>
                <p>{data?.mobile}</p>
                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch(setContact({ open: true, data: data }))
                  }
                >
                  View Number
                </Button>
              </div>
            </div>
            <div className="prop-visit-form">
              <div className="prop-visit-f-title">Schedule Visit</div>
              <SiteVisitForm propertyId={id} />
            </div>

            <h3 className="prop-d-ads-title">Trending</h3>
            <div className="prop-ads-wrap">
              {ads.map((ele, i) => (
                <AdvertiseCard
                  key={i}
                  mobile={true}
                  data={ele}
                  hideCompare={true}
                  hideShortlist={true}
                />
              ))}
            </div>
          </div>
        </div>

        {similarProperty.length > 0 && (
          <div className="max-width" style={{ maxWidth: 1330, padding: 10 }}>
            <div className="prop-sec-title">Similar Properties</div>
            <PropertySwiper data={similarProperty} />
          </div>
        )}

        <AdvertiseSwiper title="Top Projects" category={2} />
      </div>

      {galleryOpen && (
        <Gallery
          handleGalleryClose={handleGalleryOpen}
          data={{
            project_name: data?.project_name,
            postFor: data?.postFor,
            exp_price: data?.exp_price,
            monthly_rent: data?.monthly_rent,
            images: data.images,
            url: data.url,
          }}
        />
      )}
    </>
  );
};

export default PropertyDetail;

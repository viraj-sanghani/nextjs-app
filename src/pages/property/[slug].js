import Layout from "@/components/Layout";
import StickyNav from "./StickyNav";
import icons from "@/utils/icons";
import { Button } from "@mui/material";
import amenitiesIcon from "@/utils/amenities";

const compareProperty = [];

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

const Property = ({ data }) => {
  return (
    <Layout>
      <div className="property-detail-con">
        <StickyNav />

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
                  {/* {formatNumber(data?.exp_price || data?.monthly_rent || 0)} */}
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
                  onClick={() => {}}
                  /* onClick={() => 
                  dispatch(
                    setShare({
                      open: true,
                      url: data?.url,
                    })
                  )
                } */
                >
                  {icons.share}
                </span>
                <span
                  className="shortlist-icon"
                  title={
                    data?.isShortlisted
                      ? "Remove from shortlist"
                      : "Add to shortlist"
                  }
                  onClick={() => {}}
                  // onClick={() => handleChangeShortlist(data)}
                >
                  {data?.isShortlisted ? icons.starFilled : icons.star}
                </span>
                <span
                  className={`compare-icon ${
                    compareProperty.includes(data.id) ? "active" : ""
                  }`}
                  title={
                    compareProperty.includes(data.id)
                      ? "Remove from compare"
                      : "Add to compare"
                  }
                  // onClick={handleToggleCompare}
                >
                  {icons.compare}
                </span>
              </div>
            </div>

            <div className="prop-slider">
              {/* <ImageGallery
                items={data.images}
                showPlayButton={true}
                showFullscreenButton={true}
                slideInterval={3000}
                slideOnThumbnailOver={true}
                // onErrorImageURL={images.noImage}
                disableSwipe={false}
              /> */}
            </div>

            {data?.brochure && (
              <a
                // href={propertyBrochure(data.brochure)}
                target="_blank"
              >
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
                <iframe
                  className="p-youtube-v-frame"
                  src={`https://www.youtube.com/embed/${data?.youtubeLink
                    .split("/")
                    .at(-1)}-&amp;controls=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
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

              {data?.latitude && data?.longitude && (
                <div className="prop-map-con">
                  {/* <MapGoogle
                    mapContainerStyle={{
                      height: "300px",
                      width: "100%",
                    }}
                    hideCurrentLocation={true}
                    zoom={12}
                    center={{ lat: data.latitude, lng: data.longitude }}
                  >
                    <Marker
                      position={{ lat: data.latitude, lng: data.longitude }}
                    />
                  </MapGoogle> */}
                </div>
              )}
            </div>

            <div className="prop-section prop-details" id="MoreDetails">
              <div className="prop-sec-title">More Details</div>
              <div className="prop-add-con">
                {detail("Property ID", "P" + data?.id)}
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
                {detail("Possession Starts", `2025`)}
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
              // onClick={handleToggleCompare}
            >
              {compareProperty.includes(data.id)
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
                  onClick={() => {}}
                  /* onClick={() =>
                    dispatch(setContact({ open: true, data: data }))
                  } */
                >
                  View Number
                </Button>
              </div>
            </div>
            <div className="prop-visit-form">
              <div className="prop-visit-f-title">Schedule Visit</div>
              {/* <SiteVisitForm propertyId={id} /> */}
            </div>

            <h3 className="prop-d-ads-title">Trending</h3>
            <div className="prop-ads-wrap">
              {/* {ads.map((ele, i) => (
                <AdvertiseCard
                  key={i}
                  mobile={true}
                  data={ele}
                  hideCompare={true}
                  hideShortlist={true}
                />
              ))} */}
            </div>
          </div>
        </div>

        {/* {similarProperty.length > 0 && (
          <div className="max-width" style={{ maxWidth: 1330, padding: 10 }}>
            <div className="prop-sec-title">Similar Properties</div>
            <SimilarPropSwiper data={similarProperty} />
          </div>
        )} */}

        {/* <AdvertiseSwiper title="Top Projects" category={2} /> */}
      </div>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: ["/property/2380", "/property/2381"],
//     fallback: false,
//   };
// }

export const getServerSideProps = async (props) => {
  const response = await fetch(
    "https://api.housingmagic.com/v1/property/info/" + props.params.slug
  );
  const data = await response.json();

  return {
    props: {
      data: data.data,
    },
    // revalidate: 60,
  };
};

export default Property;

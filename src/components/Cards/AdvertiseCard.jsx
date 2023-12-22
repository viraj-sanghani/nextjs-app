"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import icons from "@/utils/icons";
import { adsImg, formatNumber, timeAgo } from "@/utils/helper";
import { setShare } from "@/redux/reducers/appReducer";
import { toggleCompare } from "@/redux/reducers/activityReducer";

function AdvertiseCard(props) {
  const dispatch = useDispatch();

  const handleToggleCompare = () => {
    const data = {
      id: props.data.id,
      img: props.data.img,
      url: props.data?.url,
      title: props.data.project_name,
      desc: `₹ ${formatNumber(
        props.data?.exp_price || props.data?.monthly_rent || 0
      )} ${props.data?.monthly_rent ? "/ month" : ""}`,
    };
    dispatch(toggleCompare(data));
  };

  return (
    props.data && (
      <div
        className={`property-card ${props?.mobile ? "small" : ""}`}
        onMouseEnter={props?.onHover || null}
      >
        <Link
          href={{
            pathname: props.data?.url,
          }}
          target="_blank"
          className="c-img-wrap"
          style={{ minWidth: "60%" }}
        >
          <Image
            src={adsImg(props.data?.img)}
            alt={props.data?.meta_title.replaceAll(" | ", ", ")}
            width="200"
            height="200"
          />
        </Link>
        <div className="c-detail-con">
          <div className="c-detail-wrap">
            <h4 className="c-price">
              <span>
                ₹{" "}
                {formatNumber(
                  props.data?.exp_price || props.data?.monthly_rent || 0
                )}{" "}
                {props.data?.monthly_rent ? <small>/ month</small> : ""}
              </span>
              <span>
                {!props?.hideShare && (
                  <span
                    className="share-icon"
                    title="Share"
                    onClick={() =>
                      dispatch(
                        setShare({
                          open: true,
                          url: props.data?.url,
                        })
                      )
                    }
                  >
                    {icons.share}
                  </span>
                )}

                {!props?.hideShortlist && (
                  <span
                    className="shortlist-icon"
                    title={
                      props.data?.isShortlisted
                        ? "Remove from shortlist"
                        : "Add to shortlist"
                    }
                    onClick={() =>
                      props?.changeShortlist &&
                      props.changeShortlist(props.data)
                    }
                  >
                    {props.data?.isShortlisted ? icons.starFilled : icons.star}
                  </span>
                )}

                {!props?.hideCompare && (
                  <span
                    className={`compare-icon ${
                      props?.isCompare ? "active" : ""
                    }`}
                    title={
                      props?.isCompare
                        ? "Remove from compare"
                        : "Add to compare"
                    }
                    onClick={handleToggleCompare}
                  >
                    {icons.compare}
                  </span>
                )}
              </span>
            </h4>
            <Link
              href={{
                pathname: props.data?.url,
              }}
              target="_blank"
            >
              {props.data?.project_name && (
                <h4 className="c-title">
                  {props.data.project_name}{" "}
                  {props.data?.postFor === "CP" && "(Only CP Group)"}
                </h4>
              )}
              <div className="c-sub-title">
                {props.data?.bedroom && props.data?.bedroom + " BHK"}{" "}
                {props.data?.property_type}, {props.data?.locality},{" "}
                {props.data?.city}
              </div>
              <div className="c-d-items">
                {props.data?.bedroom && (
                  <div className="c-d-item">
                    <span className="icon">{icons.bedroom}</span>
                    {props.data?.bedroom} BHK
                  </div>
                )}
                {(props.data?.carpet_area || props.data?.super_area) && (
                  <div className="c-d-item">
                    <span className="icon">{icons.area}</span>
                    {props.data?.carpet_area || props.data?.super_area}{" "}
                    <span className="c-d-small">{props.data?.area_unit}</span>
                  </div>
                )}

                {props.data?.bathroom && (
                  <div className="c-d-item">
                    <span className="icon">{icons.bathroom}</span>
                    {props.data?.bathroom} Baths
                  </div>
                )}

                {props.data?.plot_area && (
                  <div className="c-d-item">
                    <span className="icon">{icons.plot_area}</span>
                    {props.data?.plot_area} Plot Area
                  </div>
                )}

                {props.data?.washrooms && (
                  <div className="c-d-item">
                    <span className="icon">{icons.washrooms}</span>
                    {props.data?.washrooms} Washrooms
                  </div>
                )}

                {props.data?.land_zone && (
                  <div className="c-d-item">
                    <span className="icon">{icons.land_zone}</span>
                    Land Zone: {props.data?.land_zone}
                  </div>
                )}

                {[
                  "Residential Land/Plot",
                  "Commercial Land",
                  "Warehouse/Godown",
                  "Industrial Land",
                  "Industrial Shed",
                  "Agricultural Land",
                ].includes(props.data?.property_type) && (
                  <>
                    {props.data?.plot_length && (
                      <div className="c-d-item">
                        <span className="icon">{icons.plot_length}</span>
                        Plot Length: {props.data?.plot_length}
                        <span className="c-d-small">
                          {props.data?.area_unit}
                        </span>
                      </div>
                    )}

                    {props.data?.plot_breadth && (
                      <div className="c-d-item">
                        <span className="icon">{icons.plot_breadth}</span>
                        Plot Breadth: {props.data?.plot_breadth}
                        <span className="c-d-small">
                          {props.data?.area_unit}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
              {!props?.isVisitCard && (
                <>
                  {props.data?.prop_availability && (
                    <div className="c-d-info">
                      Possession Status: {props.data?.prop_availability}
                    </div>
                  )}
                  <div className="c-d-info">
                    Posted By: {props.data?.iam}
                    <span className="hidden mobile-time-ago">
                      {timeAgo(props.data?.date)}
                    </span>
                  </div>
                </>
              )}
            </Link>
          </div>
          {/* <div className="c-btns-wrap"></div> */}
        </div>
      </div>
    )
  );
}

export default AdvertiseCard;

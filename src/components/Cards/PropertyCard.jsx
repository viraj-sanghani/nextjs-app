"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import icons from "@/utils/icons";
import { formatNumber, propertySmallImg, timeAgo } from "@/utils/helper";
import { setContact, setShare } from "@/redux/reducers/appReducer";
import { toggleCompare } from "@/redux/reducers/activityReducer";

function PropertyCard(props) {
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
        >
          <Image
            src={propertySmallImg(props.data?.img)}
            height={300}
            width={300}
            alt={props.data?.meta_title.replaceAll(" | ", ", ")}
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
          <div className="c-btns-wrap">
            {props?.isListingCard ? (
              <>
                <div className="post-time">
                  <span className="color-3">{props.data?.contacted}</span> Leads
                </div>
                <div className="post-time">
                  <span className="color-3">{props.data?.siteVisits}</span>{" "}
                  Visits
                </div>
                <div className="post-time">
                  <span className="color-3">{props.data?.shortlisted}</span>{" "}
                  Shortlisted
                </div>
                <Link href={{ pathname: "/edit-property/" + props.data?.id }}>
                  <Button title="Edit" variant="contained" size="small">
                    {icons.edit}
                  </Button>
                </Link>
                <Button
                  title="Delete"
                  sx={{ ml: 2 }}
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() =>
                    props?.handleDelete && props?.handleDelete(props.data?.id)
                  }
                >
                  {icons.delete}
                </Button>
              </>
            ) : props?.isVisitCard ? (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="post-time">Name : {props.data?.name}</div>
                <div className="post-time">Mobile : {props.data?.mobile}</div>
                <div className="post-time">Email : {props.data?.email}</div>
                <div className="post-time">Visit : {props.data?.alongWith}</div>
                <div className="post-time">
                  Schedule By : {props.data?.dateTime}
                </div>
                <div className="post-time">Message : {props.data?.message}</div>
              </div>
            ) : (
              <>
                <div className="post-time">
                  {/* Posted on {moment(props.data?.date).format("ll")} */}
                  {timeAgo(props.data?.date)}
                </div>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    dispatch(setContact({ open: true, data: props.data }))
                  }
                >
                  {icons.call} View Number
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default PropertyCard;

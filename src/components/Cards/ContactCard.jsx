"use client";

import { useDispatch } from "react-redux";
import icons from "@/utils/icons";
import { formatNumber, propertySmallImg, timeAgo } from "@/utils/helper";
import { setShare } from "@/redux/reducers/appReducer";
import { toggleCompare } from "@/redux/reducers/activityReducer";
import Link from "next/link";
import Image from "next/image";

function ContactCard(props) {
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
      <div className="property-card">
        <Link
          className="c-img-wrap"
          href={{
            pathname: props.data?.url,
          }}
        >
          <Image
            src={propertySmallImg(props.data?.img)}
            height={300}
            width={300}
            alt={props.data?.meta_title.replaceAll(" | ", ", ")}
          />
        </Link>
        <div className="c-detail-con">
          <div className="c-detail-wrap" style={{ paddingTop: 0 }}>
            <h4 className="c-price">
              <span>
                {" "}
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
            >
              {props.data?.project_name && (
                <h4 className="c-title">{props.data.project_name}</h4>
              )}
              <div className="c-sub-title">
                {props.data?.bedroom && props.data?.bedroom + " BHK"}{" "}
                {props.data?.property_type}, {props.data?.locality},{" "}
                {props.data?.city}
              </div>
            </Link>
            {props.data?.reasonToBuy && (
              <div className="c-d-info">
                Reason for buy : {props.data?.reasonToBuy}
              </div>
            )}
            <div className="c-d-info">
              Interests : {props.data?.homeLoan === "Yes" && "Home Loan,"}{" "}
              {props.data?.siteVisit === "Yes" && "Site Visit"}
            </div>
            {props.data?.planningToBuy && (
              <div className="c-d-info">
                planning to buy : {props.data?.planningToBuy}
              </div>
            )}
          </div>
          <div className="c-btns-wrap" style={{ display: "initial" }}>
            <>
              <div
                className="post-timess"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="post-time">
                  <span className="color-1" style={{ margin: "4px" }}>
                    Name
                  </span>
                  : {props.data?.name}{" "}
                  <span className="color-1" style={{ marginLeft: "10px" }}>
                    Mobile
                  </span>
                  : {props.data?.mobile}
                </div>
              </div>
              <div className="post-time">
                <span className="color-1" style={{ margin: "4px" }}>
                  Email
                </span>
                : {props.data?.email}
              </div>
              <div
                className="post-time"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <span className="color-1" style={{ margin: "4px" }}>
                    Contacted on
                  </span>
                  : {timeAgo(props.data?.createdAt)}
                </span>
                {props.data?.isDealer === "Yes" && (
                  <span className="color-3">By Dealer</span>
                )}
              </div>
            </>
          </div>
        </div>
      </div>
    )
  );
}

export default ContactCard;

"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import icons from "@/utils/icons";
import { formatNumber, propertySmallImg } from "@/utils/helper";
import { toggleCompare } from "@/redux/reducers/activityReducer";

function MapCard(props) {
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
                <span
                  className="compare-icon"
                  title="Compare"
                  onClick={() => dispatch(handleToggleCompare)}
                >
                  {icons.compare}
                  {/* {props.data?.isCompare ? icons.compare : icons.compare} */}
                </span>
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
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

export default MapCard;

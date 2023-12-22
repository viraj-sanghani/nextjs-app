"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import moment from "moment/moment";
import icons from "@/utils/icons";
import NoData from "@/components/NoData";
import HistoryCardSkeleton from "@/components/Skeleton/HistoryCardSkeleton";
import { useGetSearchHistory } from "@/queryHooks/activity/useRecentSearch";
import { convertFilters, formatNumber } from "@/utils/helper";
import { filterValues } from "@/utils/data";

function RecentSearch() {
  const router = useRouter();

  const {
    data: historyData,
    isLoading: loading,
    isFetching,
    isSuccess,
  } = useGetSearchHistory();

  const handleRedirect = (url) => {
    router.push(url);
  };

  const HistoryCard = ({ url, title, time, flt }) => (
    <div className="r-s-history-card" onClick={() => handleRedirect(url)}>
      <div className="r-s-history-data-box">
        <span>{icons.history}</span>
        <div className="r-s-his-title">{title}</div>
        <div className="r-s-his-time">{moment(time).format("LT")}</div>
        <span>{icons.rightArrow}</span>
      </div>
      {Object.entries(flt).length > 0 && (
        <div className="r-s-filter-box">
          {Object.entries(flt).map((ele, i) => (
            <div className="r-s-filter-itm" key={i}>
              {[
                "propertyType",
                "constructionStatus",
                "postBy",
                "furnishing",
              ].includes(ele[0])
                ? ele[1].map((key) => filterValues[ele[0]][key]).join(", ")
                : ele[0] === "bedroom"
                ? `${ele[1].join(",")} BHK`
                : ele[0] === "budget"
                ? ele[1]?.min && ele[1]?.max
                  ? `₹${formatNumber(ele[1].min)} - ₹${formatNumber(
                      ele[1].max
                    )}`
                  : ele[1]?.min
                  ? `Above ₹${formatNumber(ele[1].min)}`
                  : `Below ₹${formatNumber(ele[1].max)}`
                : ele[0] === "area"
                ? ele[1]?.min && ele[1]?.max
                  ? `Area ${ele[1].min} - ${ele[1].max}`
                  : ele[1]?.min
                  ? `Above ${ele[1].min} Area`
                  : `Below ${ele[1].max} Area`
                : ""}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  let cur, last, flt;

  return (
    <div className="recent-search-con">
      {loading ? (
        <HistoryCardSkeleton cards={5} />
      ) : historyData?.length > 0 ? (
        historyData.map((ele, i) => {
          cur = moment(ele.updatedAt).format("LL");
          flt = convertFilters(ele?.url);
          if (last === cur)
            return (
              <HistoryCard
                key={i}
                url={ele?.url}
                title={ele?.title}
                time={ele?.updatedAt}
                flt={flt}
              />
            );
          else {
            last = cur;
            return (
              <Fragment key={i}>
                <div className="date-title">{cur}</div>
                <HistoryCard
                  url={ele?.url}
                  title={ele?.title}
                  time={ele?.updatedAt}
                  flt={flt}
                />
              </Fragment>
            );
          }
        })
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default RecentSearch;

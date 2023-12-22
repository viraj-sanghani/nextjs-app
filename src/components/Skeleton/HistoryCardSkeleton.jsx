import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HistoryCardSkeleton(props) {
  return (
    <SkeletonTheme baseColor="#c9d3df" highlightColor="#eaf1f9b3">
      {Array(props.cards)
        .fill(0)
        .map((item, i) => (
          <div className="r-s-history-card" key={i}>
            <div className="r-s-history-data-box">
              <div className="r-s-his-title">
                <Skeleton
                  style={{
                    width: "250px",
                  }}
                />
              </div>
              <Skeleton
                style={{
                  width: "50px",
                }}
              />
            </div>
            <div className="r-s-filter-box">
              <Skeleton
                className="r-s-filter-itm"
                style={{
                  width: "100px",
                }}
              />
              <Skeleton
                className="r-s-filter-itm"
                style={{
                  width: "100px",
                }}
              />
              <Skeleton
                className="r-s-filter-itm"
                style={{
                  width: "100px",
                }}
              />
            </div>
          </div>
        ))}
    </SkeletonTheme>
  );
}

export default HistoryCardSkeleton;

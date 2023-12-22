import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PropertyCardSkeleton(props) {
  return (
    <SkeletonTheme baseColor="#c9d3df" highlightColor="#eaf1f9b3">
      {Array(props.cards)
        .fill(0)
        .map((item, i) => (
          <div
            className={`skeleton property-card ${props?.mobile ? "small" : ""}`}
            key={i}
          >
            <div className="c-img-wrap">
              <Skeleton style={{ height: "100%", width: "100%" }} />
            </div>
            <div className="c-detail-con">
              <div className="c-detail-wrap">
                <Skeleton
                  style={{
                    width: "130px",
                  }}
                />
                <Skeleton
                  style={{
                    width: "200px",
                    margin: ".5rem 0",
                  }}
                />
                <Skeleton
                  count={2}
                  style={{
                    width: "280px",
                    margin: ".5rem 0",
                  }}
                />
                <Skeleton
                  style={{
                    width: "230px",
                    margin: ".5rem 0",
                  }}
                />
                <Skeleton
                  style={{
                    width: "120px",
                    margin: ".5rem 0",
                  }}
                />
              </div>
              <div className="c-btns-wrap">
                <Skeleton
                  className="post-time"
                  style={{
                    width: "110px",
                  }}
                />
                <Skeleton
                  style={{
                    width: "130px",
                    height: "35px",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
    </SkeletonTheme>
  );
}

export default PropertyCardSkeleton;

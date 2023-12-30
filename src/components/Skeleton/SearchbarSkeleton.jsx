import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SearchbarSkeleton(props) {
  return (
    <SkeletonTheme baseColor="#c9d3df" highlightColor="#eaf1f9b3">
      <div className="s-prop-type-con" style={{ gap: 30, padding: 10 }}>
        <Skeleton className="s-p-t-item" style={{ height: 30, width: 100 }} />
        <Skeleton className="s-p-t-item" style={{ height: 30, width: 100 }} />
        <Skeleton className="s-p-t-item" style={{ height: 30, width: 100 }} />
      </div>
      <div
        className="searchbar"
        style={{ alignItems: "unset", height: 65, padding: "0.5rem 1rem" }}
      >
        <Skeleton containerClassName="w-100" className="input-wrap" />
        <Skeleton className="location-icon" style={{ background: "#c9d3df" }} />
        <Skeleton className="location-icon" style={{ background: "#c9d3df" }} />
      </div>
    </SkeletonTheme>
  );
}

export default SearchbarSkeleton;

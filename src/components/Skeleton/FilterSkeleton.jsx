import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function FilterSkeleton(props) {
  return (
    <SkeletonTheme baseColor="#c9d3df" highlightColor="#eaf1f9b3">
      <div className="">
        <Skeleton
          style={{
            width: "150px",
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "200px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "200px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "150px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "150px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "200px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "150px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
        <Skeleton
          style={{
            width: "200px",
            marginTop: 20,
          }}
        />
        <div
          style={{ display: "flex", gap: 20, marginTop: 10, marginBottom: 10 }}
        >
          <Skeleton
            style={{
              width: "70px",
            }}
          />
          <Skeleton
            style={{
              width: "70px",
            }}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default FilterSkeleton;

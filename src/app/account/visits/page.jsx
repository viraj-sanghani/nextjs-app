"use client";

import DataLoading from "@/components/DataLoading";
import VisitsCard from "@/components/Cards/VisitsCard";
import NoData from "@/components/NoData";
import { useVisits } from "@/queryHooks/activity/useVisits";

function Visits() {
  const { data, isLoading: loading, isFetching, isSuccess } = useVisits();

  return (
    <div className="shortlisted-wrap">
      {loading ? (
        <DataLoading />
      ) : data?.length > 0 ? (
        data.map((ele, i) => (
          <VisitsCard
            data={ele}
            key={i}
            hideShortlist={true}
            isVisitCard={true}
            hideCompare={true}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Visits;

"use client";

import { useSelector } from "react-redux";
import DataLoading from "@/components/DataLoading";
import VisitsCard from "@/components/Cards/VisitsCard";
import NoData from "@/components/NoData";
import { useGetScheduledVisits } from "@/queryHooks/activity/useScheduledVisit";

function ScheduledVisits() {
  const { data, isLoading: loading } = useGetScheduledVisits();
  const { compareProperty } = useSelector((state) => state.activity);

  return (
    <div className="shortlisted-wrap">
      {loading ? (
        <DataLoading />
      ) : data?.length > 0 ? (
        data.map((ele, i) => (
          <VisitsCard
            data={ele}
            key={i}
            isVisitCard={true}
            isCompare={compareProperty.includes(ele.id)}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default ScheduledVisits;

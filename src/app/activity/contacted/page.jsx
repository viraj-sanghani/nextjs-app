"use client";

import { useSelector } from "react-redux";
import NoData from "@/components/NoData";
import DataLoading from "@/components/DataLoading";
import ContactCard from "@/components/Cards/ContactCard";
import { useGetContacted } from "@/queryHooks/activity/useContacted";

function Contacted() {
  const { data, isLoading: loading, isFetching, isSuccess } = useGetContacted();
  const { compareProperty } = useSelector((state) => state.activity);

  return (
    <div className="shortlisted-wrap">
      {loading ? (
        <DataLoading />
      ) : data?.length > 0 ? (
        data.map((ele, i) => (
          <ContactCard
            data={ele}
            key={i}
            isCompare={compareProperty.includes(ele.id)}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Contacted;

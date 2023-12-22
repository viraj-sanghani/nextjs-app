"use client";

import NoData from "@/components/NoData";
import DataLoading from "@/components/DataLoading";
import ContactCard from "@/components/Cards/ContactCard";
import { useGetLeads } from "@/queryHooks/activity/useLeads";

function Leads() {
  const { data, isLoading: loading, isFetching, isSuccess } = useGetLeads();

  return (
    <div className="shortlisted-wrap">
      {loading ? (
        <DataLoading />
      ) : data?.length > 0 ? (
        data.map((ele, i) => (
          <ContactCard
            data={ele}
            key={i}
            hideShortlist={true}
            hideCompare={true}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Leads;

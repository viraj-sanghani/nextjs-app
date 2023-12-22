"use client";

import { useSelector } from "react-redux";
import ShortListCard from "@/components/Cards/ShortListCard";
import PropertyCardSkeleton from "@/components/Skeleton/PropertyCardSkeleton";
import NoData from "@/components/NoData";
import {
  useGetShortlist,
  useDeleteShortlisted,
} from "@/queryHooks/activity/useShortlist";

function Shortlisted() {
  const { mutate: deleteFromShortList } = useDeleteShortlisted();
  const { compareProperty } = useSelector((state) => state.activity);

  const {
    data: shortlisted,
    isLoading: loading,
    isFetching,
    isSuccess,
  } = useGetShortlist();

  const handleChangeShortlist = (item) => {
    deleteFromShortList(item);
  };

  return (
    <div className="shortlisted-wrap">
      {loading ? (
        <PropertyCardSkeleton cards={6} mobile={true} />
      ) : shortlisted?.length > 0 ? (
        shortlisted.map((ele, i) => (
          <ShortListCard
            key={i}
            data={ele}
            mobile={true}
            isCompare={compareProperty.includes(ele.id)}
            changeShortlist={handleChangeShortlist}
          />
        ))
      ) : (
        <NoData />
      )}
    </div>
  );
}

export default Shortlisted;

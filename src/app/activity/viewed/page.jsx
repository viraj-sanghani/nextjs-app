"use client";

import { useDispatch, useSelector } from "react-redux";
import ViewedCard from "@/components/Cards/ViewedCard";
import NoData from "@/components/NoData";
import PropertyCardSkeleton from "@/components/Skeleton/PropertyCardSkeleton";
import { setviewed } from "@/redux/reducers/activityReducer";
import { shortlistToggle } from "@/redux/actions/activity";
import {
  useGetViewed,
  useDeleteShortlisted,
  useAddShortListed,
} from "@/queryHooks/activity/useViewed";

function Viewed() {
  const dispatch = useDispatch();
  const { mutate: remove } = useDeleteShortlisted();
  const { mutate: add } = useAddShortListed();
  const { compareProperty } = useSelector((state) => state.activity);

  const {
    data: viewed,
    isLoading: loading,
    isFetching,
    isSuccess,
  } = useGetViewed();

  const handleChangeShortlist = async (item) => {
    if (item?.isShortlisted) {
      remove(item);
    } else {
      add(item);
    }

    dispatch(shortlistToggle(item));
    dispatch(
      setviewed(
        viewed.map((ele) => {
          if (ele.id == item.id) {
            return { ...ele, isShortlisted: !ele.isShortlisted };
          }
          return ele;
        })
      )
    );
  };

  return (
    <div className="viewed-wrap">
      {loading ? (
        <PropertyCardSkeleton cards={6} mobile={true} />
      ) : viewed?.length > 0 ? (
        viewed.map((ele, i) => (
          <ViewedCard
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

export default Viewed;

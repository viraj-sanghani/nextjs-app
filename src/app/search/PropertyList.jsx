"use client";

import { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import DataLoading from "@/components/DataLoading";
import PropertyCard from "@/components/Cards/PropertyCard";
import PropertyCardSkeleton from "@/components/Skeleton/PropertyCardSkeleton";
import { shortlistToggle } from "@/redux/actions/activity";
import { setActiveOnMap } from "@/redux/reducers/appReducer";
import { fetchMoreSearchData } from "@/redux/actions/search";
import {
  setCurrentPage,
  toggleShortlist,
} from "@/redux/reducers/filterReducer";
import ResultHeader from "./ResultHeader";
import Pagination from "@/components/Pagination";

function PropertyList() {
  const dispatch = useDispatch();
  const {
    properties,
    isDataPending,
    totalPages,
    cardPerChunk,
    curChunk,
    curPage,
    isFetching,
    viewType,
  } = useSelector((state) => state.filter);
  const { compareProperty } = useSelector((state) => state.activity);
  const [showPagination, setShowPagination] = useState(false);

  const handleChangeShortlist = (item) => {
    dispatch(shortlistToggle(item));
    dispatch(toggleShortlist({ id: item.id }));
  };

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(page));
    setTimeout(() => {
      dispatch(fetchMoreSearchData());
    }, 0);
  };

  useEffect(() => {
    setShowPagination(
      totalPages > 1 && (curChunk === cardPerChunk || !isDataPending)
    );
  }, [totalPages, curChunk, curPage, isDataPending]);

  return (
    <div className={`s-r-wrap ${viewType === "list" ? "show" : ""}`}>
      <ResultHeader desktop={true} />

      {!properties || isFetching ? (
        <div className="s-r-list-items">
          <PropertyCardSkeleton cards={5} />
        </div>
      ) : properties.length > 0 ? (
        <InfiniteScroll
          dataLength={properties.length}
          next={() => dispatch(fetchMoreSearchData())}
          hasMore={isDataPending}
          loader={<DataLoading />}
        >
          {properties.map((ele, index) => (
            <PropertyCard
              data={ele}
              key={index}
              changeShortlist={handleChangeShortlist}
              isCompare={compareProperty.includes(ele.id)}
              onHover={() => dispatch(setActiveOnMap(ele))}
            />
          ))}
        </InfiniteScroll>
      ) : (
        <div style={{ maxWidth: 500, margin: "auto" }}>
          <img
            style={{ width: "100%" }}
            src="/img/no-search-result.png"
            alt="No Result"
          />
        </div>
      )}
      {showPagination && (
        <Pagination
          pageCount={totalPages}
          currentPage={curPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default memo(PropertyList);

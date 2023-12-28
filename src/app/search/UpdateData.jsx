"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData, sendSearchData } from "@/redux/actions/search";
import {
  removePropertyData,
  setSearchType,
  setUrlParams,
} from "@/redux/reducers/filterReducer";
import { useParams, useSearchParams } from "next/navigation";

function UpdateData() {
  const { params } = useParams();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { filterData, voiceData, sort, isInit } = useSelector(
    (state) => state.filter
  );

  const getQueryData = () => {
    const urlParams = {
      city:
        searchParams.get("city") ||
        (voiceData?.city && voiceData.city[0]) ||
        "all",
      locality: searchParams.get("locality")
        ? [searchParams.get("locality")]
        : [],
      project: searchParams.get("project") || null,
      lat: searchParams.get("lat") || null,
      lng: searchParams.get("lng") || null,
      radius: searchParams.get("r") || null,
      type: params[1],
      forr: params[0],
    };
    return urlParams;
  };

  const fetchData = () => {
    const urlParams = getQueryData();

    const search = {
      page: 1,
      ...urlParams,
      ...filterData,
      sort,
    };

    dispatch(setUrlParams(urlParams));
    dispatch(
      setSearchType({
        type: params[1],
        for: params[0],
      })
    );

    dispatch(fetchSearchData(search));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    isInit && fetchData();

    return () => {
      dispatch(removePropertyData());
    };
  }, [isInit, filterData, sort]);

  useEffect(() => {
    if (isInit && isLoggedIn) {
      const urlParams = {
        city:
          searchParams.get("city") ||
          (voiceData?.city && voiceData.city[0]) ||
          "all",
        locality: searchParams.get("locality")
          ? [searchParams.get("locality")]
          : [],
        project: searchParams.get("project") || null,
        type: params[1],
        forr: params[0],
      };

      sendSearchData({
        ...urlParams,
        url: location.pathname + location?.search,
      });
    }
  }, [isInit]);

  return <></>;
}

export default UpdateData;

import { useQuery } from "react-query";
import { propertyOriginalImg, propertySmallImg } from "@/utils/helper";
import { call, getPropertyInfo } from "@/services/api";

const fetchDetails = async (id) => {
  const res = await call(getPropertyInfo(id));
  const images = res.data?.images.map((ele) => {
    return {
      original: propertyOriginalImg(ele?.img),
      thumbnail: propertySmallImg(ele?.img),
      thumbnailLabel: ele?.type,
    };
  });

  const amenities = res.data?.amenities ? res.data?.amenities.split(",") : [];
  return { ...res.data, images, amenities };
};

export const useGetPropertyDetails = (id) => {
  return useQuery(["get-PropertyDetails", id], () => fetchDetails(id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

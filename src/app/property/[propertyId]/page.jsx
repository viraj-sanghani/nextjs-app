import { cache } from "react";
import Error from "@/components/Error";
import PropertyDetail from "./Detail";
import { call, getPropertyInfo } from "@/services/api";
import { propertyOriginalImg, propertySmallImg } from "@/utils/helper";
import generateMeta from "@/utils/metadata";

export const getPropertyDetail = cache(async (id) => {
  const res = await call(getPropertyInfo(id));
  return res.data;
});

export async function generateMetadata({ params, searchParams }, parent) {
  const id = (params?.propertyId || "").split("-").at(-1);
  const data = await getPropertyDetail(id);

  return generateMeta({
    meta_title: data.meta_title,
    meta_keyword: data.meta_keyword,
    meta_desc: data.meta_description,
    meta_url: data.url,
    image: propertySmallImg(data.images[0].img),
  });
}

const page = async ({ params }) => {
  const id = (params?.propertyId || "").split("-").at(-1);
  const data = await getPropertyDetail(id);

  const images = data?.images.map((ele) => {
    return {
      original: propertyOriginalImg(ele?.img),
      thumbnail: propertySmallImg(ele?.img),
      thumbnailLabel: ele?.type,
    };
  });

  const amenities = data?.amenities ? data?.amenities.split(",") : [];

  return data ? (
    <PropertyDetail data={{ ...data, images, amenities }} id={id} />
  ) : (
    <Error />
  );
};

export default page;

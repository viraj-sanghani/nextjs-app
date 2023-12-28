import { cache } from "react";
import Error from "@/components/Error";
import PropertyDetail from "./Detail";
import { call, getPropertyInfo } from "@/services/api";
import { propertySmallImg } from "@/utils/helper";
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

  const mainImage = data?.images.filter((ele) => {
    return ele.type === "Main Image";
  });

  const image = mainImage[0]
    ? mainImage[0].img
    : data.images[0]
    ? data.images[0].img
    : "";

  const amenities = data?.amenities ? data?.amenities.split(",") : [];

  return data ? (
    <PropertyDetail data={{ ...data, image, amenities }} id={id} />
  ) : (
    <Error />
  );
};

export default page;

import Error from "@/components/Error";
import PropertyDetail from "./Detail";
import { getPropertyInfo } from "@/services/api";
import { propertySmallImg } from "@/utils/helper";
import generateMeta from "@/utils/metadata";

export const getPropertyDetail = async (id) => {
  try {
    const res = await getPropertyInfo(id);
    return res.data;
  } catch (err) {
    return;
  }
};

export async function generateMetadata({ params, searchParams }, parent) {
  const id = (params?.propertyId || "").split("-").at(-1);
  const data = await getPropertyDetail(id);

  return data
    ? generateMeta({
        meta_title: data?.meta_title,
        meta_keyword: data?.meta_keyword,
        meta_desc: data?.meta_description,
        meta_url: data?.url,
        image: data?.images ? propertySmallImg(data.images[0].img) : "",
      })
    : null;
}

const page = async ({ params }) => {
  const id = (params?.propertyId || "").split("-").at(-1);
  const data = await getPropertyDetail(id);

  if (!data) return <Error />;

  const mainImage = data?.images.filter((ele) => {
    return ele.type === "Main Image";
  });

  const image = mainImage[0]
    ? mainImage[0].img
    : data.images[0]
    ? data.images[0].img
    : "";

  const amenities = data?.amenities ? data?.amenities.split(",") : [];

  return <PropertyDetail data={{ ...data, image, amenities }} id={id} />;
};

export default page;

import Home from "./_home/page";
import { getHomePageBanners, getHomePageData, getAds } from "@/services/api";
import generateMeta from "@/utils/metadata";

export const metadata = generateMeta("home");

export const getHomeDetail = async () => {
  const [homeBanners, homeData, recentLaunch] = await Promise.all([
    getHomePageBanners(),
    getHomePageData(),
    getAds(1),
  ]);
  return {
    ...homeData.data,
    homeBanners: homeBanners.data,
    recentLaunch: recentLaunch.data,
  };
};

const page = async () => {
  const data = await getHomeDetail();
  return <Home data={data} />;
};

export default page;

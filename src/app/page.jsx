import { cache } from "react";
import Home from "./_home/page";
import {
  call,
  getHomePageBanners,
  getHomePageData,
  getAds,
} from "@/services/api";

export const getHomeDetail = cache(async () => {
  const [homeBanners, homeData, recentLaunch] = await Promise.all([
    getHomePageBanners(),
    getHomePageData(),
    call(getAds(1)),
  ]);
  return {
    ...homeData.data,
    homeBanners: homeBanners.data,
    recentLaunch: recentLaunch.data,
  };
});

const page = async () => {
  const data = await getHomeDetail();
  return <Home data={data} />;
};

export default page;

import { useQuery } from "react-query";
import { call, getHomePageBanners, getHomePageData } from "@/services/api";

const fetchHomeData = async () => {
  const [homeData, homeBanners] = await Promise.all([
    call(getHomePageData()),
    call(getHomePageBanners()),
  ]);
  return { ...homeData.data, homeBanners: homeBanners.data };

  // const res = await call(getHomePageData());
  // return res.data;
};

export const useGetHomePage = () => {
  return useQuery("get-HomePageData", fetchHomeData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

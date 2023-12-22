import Home from "./_home/page";
import { call, getAds } from "@/services/api";

const fetchRecentProp = async () => {
  try {
    const res = await call(getAds(1));
    return res.data;
  } catch (err) {
    return [];
  }
};

const page = async () => {
  const recentProp = await fetchRecentProp();
  return <Home recentLaunch={recentProp} />;
};

export default page;

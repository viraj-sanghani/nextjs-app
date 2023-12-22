import { useQuery } from "react-query";
import { call, getSiteVisits } from "@/services/api";

const fetchScheduledVisits = async () => {
  const res = await call(getSiteVisits());
  return res.data;
};

export const useGetScheduledVisits = () => {
  return useQuery("get-ScheduledVisits", fetchScheduledVisits, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

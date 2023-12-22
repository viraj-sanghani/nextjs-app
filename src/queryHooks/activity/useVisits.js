import { useQuery } from "react-query";
import { call, getPropertyVisits } from "@/services/api";

const fetchVisits = async () => {
  const res = await call(getPropertyVisits());
  return res.data;
};

export const useVisits = () => {
  return useQuery("get-Visits", fetchVisits, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

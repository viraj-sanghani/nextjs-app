import { useQuery } from "react-query";
import { call, getLeads } from "@/services/api";

const fetchLeads = async () => {
  const res = await call(getLeads());
  return res.data;
};

export const useGetLeads = () => {
  return useQuery("get-contacted", fetchLeads, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

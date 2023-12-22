import { useQuery } from "react-query";
import { call, getSearchHistory } from "@/services/api";

const fetchSearchHistory = async () => {
  const res = await call(getSearchHistory());
  return res.data;
};

export const useGetSearchHistory = () => {
  return useQuery("get-SearchHistory", fetchSearchHistory, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

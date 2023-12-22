import { useQuery } from "react-query";
import { call, getSuggestions } from "@/services/api";

const fetchSearchSuggestion = async (search, type) => {
  const res = await call(getSuggestions({ term: search, type: type }));
  return res.data;
};

export const useGetSearchSuggestion = (search, type) => {
  return useQuery(
    ["get-SearchSuggestion", search, type],
    () => search && fetchSearchSuggestion(search, type),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      cacheTime: 120000,
      staleTime: 30 * 1000,
    }
  );
};

import { useQuery } from "react-query";
import { call, getContacted } from "@/services/api";

const fetchContacted = async () => {
  const res = await call(getContacted());
  return res.data;
};

export const useGetContacted = () => {
  return useQuery("get-contacted", fetchContacted, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

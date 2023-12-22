import { useQuery } from "react-query";
import { call, getCompareProperty } from "@/services/api";
import { compareFields } from "@/utils/data";

const fetchDetails = async (properties) => {
  const res = await call(getCompareProperty({ properties }));
  const data = res.data;
  const fields = [];
  const titles = [];

  Object.keys(compareFields).forEach((key) => {
    let show = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i][key]) {
        show = true;
      }
    }
    if (show) {
      fields.push(key);
      titles.push(compareFields[key]);
    }
  });

  return { titles, fields, data };
};

export const useGetCompareProperty = (properties) => {
  return useQuery(
    ["get-CompareProperty", properties],
    () => properties.length > 0 && fetchDetails(properties),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

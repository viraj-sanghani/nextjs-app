import { useMutation, useQuery, useQueryClient } from "react-query";
import { call, getShortlisted, removeShortlisted } from "@/services/api";

const fetchShortlist = async () => {
  const res = await call(getShortlisted());
  return res.data;
};

export const useGetShortlist = () => {
  return useQuery("get-ShortList", fetchShortlist, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

const deleteShortlisted = async (data) => {
  await call(removeShortlisted({ propertyId: data.id }));
};

export const useDeleteShortlisted = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteShortlisted, {
    onMutate: async (data) => {
      await queryClient.cancelQueries("get-ShortList");
      const previousViewedData = queryClient.getQueryData("get-ShortList");

      queryClient.setQueryData("get-ShortList", (oldQueryData) => {
        return previousViewedData.filter((ele) => {
          if (ele.id !== data.id) {
            return ele;
          }
        });
      });
      return { previousViewedData };
    },
    onError: (context) => {
      console.log("an error occured");
      queryClient.setQueryData("get-ShortList", context.previousViewedData);
    },
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries("get-ShortList");
    },
  });
};

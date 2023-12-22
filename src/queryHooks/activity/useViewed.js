import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addShortlisted,
  call,
  removeShortlisted,
  getViewed,
} from "@/services/api";

const fetchViewed = async () => {
  const res = await call(getViewed());
  return res.data;
};

export const useGetViewed = () => {
  return useQuery("get-Viewed", fetchViewed, {
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
      await queryClient.cancelQueries("get-Viewed");
      const previousViewedData = queryClient.getQueryData("get-Viewed");
      const PreviousShortListedData = queryClient.getQueryData("get-ShortList");

      queryClient.setQueryData("get-Viewed", (oldQueryData) => {
        return previousViewedData.map((ele) => {
          if (ele.id === data.id && ele.isShortlisted) {
            return { ...ele, isShortlisted: 0 };
          }
          return ele;
        });
      });
      queryClient.setQueryData("get-ShortList", (oldQueryData) => {
        return PreviousShortListedData?.filter((ele) => {
          if (ele.id !== data.id) {
            return ele;
          }
        });
      });
      return { previousViewedData };
    },
    onError: (context) => {
      queryClient.setQueryData("get-Viewed", context.previousViewedData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("get-Viewed");
    },
  });
};

const postShortlisted = async (data) => {
  await call(addShortlisted({ propertyId: data.id }));
};

export const useAddShortListed = () => {
  const queryClient = useQueryClient();

  return useMutation(postShortlisted, {
    onMutate: async (data) => {
      await queryClient.cancelQueries("get-Viewed");
      const previousViewedData = queryClient.getQueryData("get-Viewed");
      const PreviousShortListedData = queryClient.getQueryData("get-ShortList");

      queryClient.setQueryData("get-Viewed", (oldQueryData) => {
        return previousViewedData.map((ele) => {
          if (ele.id === data.id && !ele.isShortlisted) {
            return { ...ele, isShortlisted: 1 };
          }
          return ele;
        });
      });

      queryClient.setQueryData("get-ShortList", (oldQueryData) => {
        return PreviousShortListedData
          ? [{ ...data, isShortlisted: 1 }, ...PreviousShortListedData]
          : [{ ...data, isShortlisted: 1 }];
      });
      return { previousViewedData };
    },
    onError: (context) => {
      queryClient.setQueryData("get-Viewed", context.previousViewedData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("get-Viewed");
    },
  });
};

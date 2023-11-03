import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const restaurantReviewApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Restaurant-Review"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      removeReviewList: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveReviewList}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Restaurant-Review"],
      }),
    }),
  });

export const { useRemoveReviewListMutation } = restaurantReviewApiSlice;

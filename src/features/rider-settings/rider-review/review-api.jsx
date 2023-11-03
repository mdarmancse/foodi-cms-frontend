import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const restaurantReviewApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Riders-Review"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      RemoveRiderReview: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveRiderReview}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Riders-Review"],
      }),
    }),
  });

export const { useRemoveRiderReviewMutation } = restaurantReviewApiSlice;

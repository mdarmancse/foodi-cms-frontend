import { apiSlice } from "@/features/api";

const rewardLabelApiSLice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RewardLabel"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRewardLabels: builder.query({
        query: () => `user-accounting/reward-level-setting`,
        providesTags: ["RewardLabel"],
      }),
      deleteRewardLabels: builder.mutation({
        query: (id) => ({
          url: `user-accounting/reward-level-setting/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["RewardLabel"],
      }),
      addRewardLabels: builder.mutation({
        query: (data) => ({
          url: `user-accounting/reward-level-setting`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["RewardLabel"],
      }),
      getRewardLabelById: builder.query({
        query: (id) => `user-accounting/reward-level-setting/${id}`,
        providesTags: ["RewardLabel"],
      }),
      editRewardLabel: builder.mutation({
        query: (data) => ({
          url: `user-accounting/reward-level-setting/${data?.id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["RewardLabel"],
      }),
    }),
  });

export const {
  useGetRewardLabelsQuery,
  useDeleteRewardLabelsMutation,
  useAddRewardLabelsMutation,
  useGetRewardLabelByIdQuery,
  useEditRewardLabelMutation
} = rewardLabelApiSLice;

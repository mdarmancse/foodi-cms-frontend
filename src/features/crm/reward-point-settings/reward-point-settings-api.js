import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const RewardPointSettingsSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RewardPointSettings"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteRewardPointSettings: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.DeleteRewardPointSettings}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["RewardPointSettings"],
      }),
      addRewardPointSettings: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateRewardPointSettings}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["RewardPointSettings"],
      }),
      getRewardPointSettingsById: builder.query({
        query: (id) => `${Api.GetRewardPointSettings}/${id}`,
        providesTags: ["RewardPointSettings"],
      }),
      editRewardPointSettings: builder.mutation({
        query: (data) => ({
          url: `${Api.EditRewardPointSettings}/${data?.id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["RewardPointSettings"],
      }),
      getRewardLabels: builder.query({
        query: () => Api.GetRewardLevelList,
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.items?.map((item) => {
              return {
                value: item._id,
                label: item.name,
              };
            }),
          };
          return newResponse;
        },
      }),
    }),
  });

export const {
  useDeleteRewardPointSettingsMutation,
  useAddRewardPointSettingsMutation,
  useGetRewardPointSettingsByIdQuery,
  useEditRewardPointSettingsMutation,
  useGetRewardLabelsQuery
} = RewardPointSettingsSlice;

import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const campaignSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Campaign"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCampaign: builder.mutation({
        query: (payload) => {
          return {
            url: Api.Campaign,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Campaign"],
      }),
      getSingleCampaign: builder.query({
        query: (id) => ({
          url: `${Api.Campaign}/${id}`,
          method: "GET",
        }),
      }),
      updateCampaign: builder.mutation({
        query: ({ id, data }) => {
          return {
            url: `${Api.Campaign}/${id}`,
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["Campaign"],
      }),
      deleteCampaign: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.Campaign}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Campaign"],
      }),
    }),
  });

export const {
  useCreateCampaignMutation,
  useLazyGetSingleCampaignQuery,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = campaignSlice;

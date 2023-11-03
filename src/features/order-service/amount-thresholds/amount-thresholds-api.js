import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const AmountThresholdApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["amount-threshold"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAmountThreshold: builder.query({
        query: () => ({
          url: `${Api.GetThresholdList}`,
        }),
        providesTags: ["amount-threshold"],
      }),

      getAmountThresholdId: builder.query({
        query: (id) => ({
          url: `${Api.GetThresholdListId}${id}`,
        }),
      }),
      createAmountThreshold: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateThresholdList}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["amount-threshold"],
      }),
      updateAmountThreshold: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateThresholdList}${data.id}`,
          method: "PATCH",
          body: data,
        }),
      }),
      removeAmountThreshold: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveThresholdList}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["amount-threshold"],
      }),
      getZoneList: builder.query({
        query: () => "/system-operations/api/Zone/Option",
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
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
  useGetAmountThresholdQuery,
  useLazyGetAmountThresholdQuery,
  useGetAmountThresholdIdQuery,
  useLazyGetAmountThresholdIdQuery,
  useCreateAmountThresholdMutation,
  useUpdateAmountThresholdMutation,
  useRemoveAmountThresholdMutation,
  useGetZoneListQuery,
} = AmountThresholdApiSlice;

import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const RiderLeaveRequestApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["RiderLeaveRequest"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteRiderLeaveRequest: builder.mutation({
        query: (data) => ({
          url: `${Api.DeleteRiderLeaveRequest}/${data?.id}?isActive=${data?.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["RiderLeaveRequest"],
      }),
      getRiderOptions: builder.query({
        query: () => "/riders/api/Rider/Option",
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item?.id,
                label: item?.name,
              };
            }),
          };
          return newResponse;
        },
      }),
      getRiderShiftDutyOptions: builder.query({
        query: () => "/riders/api/RiderShiftDutySetup/Option",
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item?.id,
                label: item?.name,
              };
            }),
          };
          return newResponse;
        },
      }),
      addRiderLeaveRequest : builder.mutation({
        query : (data) => ({
          url : Api.CreateRiderLeaveRequest,
          method : 'POST',
          body : data
        }),
        invalidatesTags:["RiderLeaveRequest"]
      }),
      getRiderShiftLeaveRequestByID : builder.query({
        query : (id) => `${Api.GetRiderLeaveRequest}/${id}`,
        providesTags : ["RiderLeaveRequest"]
      })
    }),
  });

export const {
  useDeleteRiderLeaveRequestMutation,
  useGetRiderOptionsQuery,
  useGetRiderShiftDutyOptionsQuery,
  useAddRiderLeaveRequestMutation,
  useGetRiderShiftLeaveRequestByIDQuery
} = RiderLeaveRequestApi;

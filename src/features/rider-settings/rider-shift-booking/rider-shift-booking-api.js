import { apiSlice } from "@/features/api";

const riderShiftBookingApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["rider-shift-booking"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRider: builder.query({
        query: () => "/riders/api/Rider/Option",
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
      getRiderShiftDuty: builder.query({
        query: () => "riders/api/RiderShiftDutySetup/Option",
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: `Shift No: ${item.name}`,
              };
            }),
          };
          return newResponse;
        },
      }),
      getShiftSwap: builder.query({
        query: () => "/riders/api/ShiftSwapStatus/Option",
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
      getRiderShiftById: builder.query({
        query: (id) => `/riders/api/RiderShiftBooking/${id}`,
      }),
      addRiderShiftBooking: builder.mutation({
        query: (data) => ({
          url: "riders/api/RiderShiftBooking",
          method: "POST",
          body: data,
        }),
      }),
      editRiderShiftBooking: builder.mutation({
        query: (data) => ({
          url: `riders/api/RiderShiftBooking/${data.id}`,
          method: "PUT",
          body: data,
        }),
      }),
      deleteRiderShiftBooking: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/riders/api/RiderShiftBooking/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useGetRiderQuery,
  useGetShiftSwapQuery,
  useGetRiderShiftDutyQuery,
  useAddRiderShiftBookingMutation,
  useEditRiderShiftBookingMutation,
  useGetRiderShiftByIdQuery,
  useDeleteRiderShiftBookingMutation,
} = riderShiftBookingApiSlice;

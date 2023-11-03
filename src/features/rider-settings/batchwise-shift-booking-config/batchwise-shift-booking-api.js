import { apiSlice } from "@/features/api";

const bookingwiseShiftBookingApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["shift-booking"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBatchLevel: builder.query({
        query: () => ({
          url: "riders/api/BatchLevel/GetAllBatchLevel",
          method: "GET",
        }),
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
      getWeekDay: builder.query({
        query: () => ({
          url: "/riders/api/Weekday/Option",
          method: "GET",
        }),
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
      getBatchwiseById: builder.query({
        query: (id) => ({
          url: `riders/api/BatchWiseShiftBookingConfig/${id}`,
          method: "GET",
        }),
        providesTags: ["shift-booking"],
      }),
      addBatchwiseShift: builder.mutation({
        query: (data) => ({
          url: "riders/api/BatchWiseShiftBookingConfig",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["shift-booking"],
      }),
      editBatchwiseShift: builder.mutation({
        query: (data) => ({
          url: `riders/api/BatchWiseShiftBookingConfig/${data.id}`,
          method: "PUT",
          body: data.params,
        }),
        invalidatesTags: ["shift-booking"],
      }),
      deleteBatchwiseShift: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `riders/api/BatchWiseShiftBookingConfig/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["shift-booking"],
      }),
    }),
  });

export const {
  useGetBatchLevelQuery,
  useGetWeekDayQuery,
  useAddBatchwiseShiftMutation,
  useEditBatchwiseShiftMutation,
  useGetBatchwiseByIdQuery,
  useDeleteBatchwiseShiftMutation,
} = bookingwiseShiftBookingApiSlice;

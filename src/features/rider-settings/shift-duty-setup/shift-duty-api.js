import { apiSlice } from "@/features/api";

const shiftDutyApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["shift-duty"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getZone: builder.query({
        query: () => "/system-operations/api/Zone/Option",
        transformResponse: (response) => {
          console.log("response", response);
          const newResponse = {
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
        query: () => "/system-operations/api/WeekDay",
        transformResponse: (response) => {
          const newResponse = {
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
      getShifyDutyById: builder.query({
        query: (id) => `riders/api/RiderShiftDutySetup/${id}`,
        providesTags: ["shift-duty"],
      }),
      addShiftDutySetup: builder.mutation({
        query: (data) => ({
          url: "/riders/api/RiderShiftDutySetup",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["shift-duty"],
      }),
      editShiftDutySetup: builder.mutation({
        query: (data) => ({
          url: `riders/api/RiderShiftDutySetup/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["shift-duty"],
      }),
      deleteShiftDutySetup: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/riders/api/RiderShiftDutySetup/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useGetZoneQuery,
  useGetWeekDayQuery,
  useAddShiftDutySetupMutation,
  useEditShiftDutySetupMutation,
  useGetShifyDutyByIdQuery,
  useDeleteShiftDutySetupMutation,
} = shiftDutyApiSlice;

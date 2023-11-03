import { apiSlice } from "../api";

const shiftSwapApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["ShiftSwapStatus"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getShiftSwapStatus: builder.query({
        query: ({ perPage, pageNumber }) =>
          `riders/api/ShiftSwapStatus?PageNumber=${pageNumber}&ItemsPerPage=${perPage}`,
        providesTags: ["ShiftSwapStatus"],
      }),
      searchShiftSwapStatus: builder.query({
        query: ({ name }) => `riders/api/ShiftSwapStatus?Name=${name}`,
      }),
      getSwapStatusById: builder.query({
        query: (id) => `riders/api/ShiftSwapStatus/${id}`,
      }),
      addShiftStatusQuery: builder.mutation({
        query: (data) => ({
          url: "riders/api/ShiftSwapStatus",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["ShiftSwapStatus"],
      }),
      editShiftSwapStatus: builder.mutation({
        query: (data) => ({
          url: `riders/api/ShiftSwapStatus/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["ShiftSwapStatus"],
      }),
      deleteShiftSwapStatus: builder.mutation({
        query: ({id,isActive}) => ({
          url: `riders/api/ShiftSwapStatus/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ShiftSwapStatus"],
      }),
    }),
  });

export const {
  useGetShiftSwapStatusQuery,
  useLazyGetShiftSwapStatusQuery,
  useLazySearchShiftSwapStatusQuery,
  useAddShiftStatusQueryMutation,
  useGetSwapStatusByIdQuery,
  useEditShiftSwapStatusMutation,
  useDeleteShiftSwapStatusMutation,
} = shiftSwapApiSlice;

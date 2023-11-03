import { apiSlice } from "../api";

const riderTypeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RiderType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRiderTypes: builder.query({
        query: ({ pageNumber, itemsPerPage }) =>
          `riders/api/RiderType?PageNumber=${pageNumber}&ItemsPerPage=${itemsPerPage}`,
          providesTags:["RiderType"]
      }),
      addRiderType: builder.mutation({
        query: (data) => ({
          url: `riders/api/RiderType`,
          method: "POST",
          body: data,
        }),
        invalidatesTags:["RiderType"]
      }),
      getRiderTypeById: builder.query({
        query: (id) => `riders/api/RiderType/${id}`,
        providesTags:["RiderType"]
      }),
      editRiderType: builder.mutation({
        query: (data) => ({
          url: `riders/api/RiderType/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["RiderType"],
      }),
      deleteRiderType: builder.mutation({
        query: (data) => ({
          url: `riders/api/RiderType/${data?.id}?isActive=${data?.isActive}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useGetRiderTypesQuery,
  useLazyGetRiderTypesQuery,
  useAddRiderTypeMutation,
  useGetRiderTypeByIdQuery,
  useEditRiderTypeMutation,
  useDeleteRiderTypeMutation,
} = riderTypeApiSlice;

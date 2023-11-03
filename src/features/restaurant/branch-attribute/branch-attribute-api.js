import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
const branchAttributeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["BranchAttribute"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addBranchAttribute: builder.mutation({
        query: (data) => ({
          url: Api.BranchAttribute,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["BranchAttribute"],
      }),
      getByIdBranchAttribute: builder.query({
        query: (id) => ({ url: `${Api.BranchAttribute}/${id}`, method: "GET" }),
      }),
      editBranchAttribute: builder.mutation({
        query: ({ id, data }) => ({
          url: `${Api.BranchAttribute}/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["BranchAttribute"],
      }),
      deleteBranchAttribute: builder.mutation({
        query: (data) => ({
          url: `${Api.BranchAttribute}/${data.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["BranchAttribute"],
      }),
    }),
  });

export const {
  useAddBranchAttributeMutation,
  useLazyGetByIdBranchAttributeQuery,
  useEditBranchAttributeMutation,
  useDeleteBranchAttributeMutation,
} = branchAttributeApiSlice;

import { apiSlice } from "../api";

const batchLevelApiSLice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["BatchLevel"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBatchLevel: builder.query({
        query: () => `riders/api/BatchLevel`,
        providesTags: ["BatchLevel"],
      }),
      addBatchLevel: builder.mutation({
        query: (data) => ({
          url: `riders/api/BatchLevel`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["BatchLevel"],
      }),
      deleteBatchLevel: builder.mutation({
        query: ({id, isActive}) => ({
          url: `/riders/api/BatchLevel/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["BatchLevel"],
      }),
      getBatchLevelById : builder.query({
        query : (id) => `riders/api/BatchLevel/${id}`,
        providesTags : ["BatchLevel"], 
      }),
      editBatchLevel: builder.mutation({
        query: (data) => ({
          url: `riders/api/BatchLevel/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["BatchLevel"],
      }),
    }),
  });

export const {
  useGetBatchLevelQuery,
  useDeleteBatchLevelMutation,
  useAddBatchLevelMutation,
  useEditBatchLevelMutation,
  useGetBatchLevelByIdQuery
} = batchLevelApiSLice;

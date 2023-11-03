import { apiSlice } from "@/features/api";

const addonsCategoryApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["AddOnsCategory"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAddOnsCategory: builder.query({
        query: ({ perPage, pageNumber }) =>
          `restaurants/api/AddOnCategory?Offset=${pageNumber}&Limit=${perPage}`,
        providesTags: ["AddOnsCategory"],
      }),
      addAddOnCategory: builder.mutation({
        query: (data) => ({
          url: `restaurants/api/AddOnCategory`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["AddOnsCategory"],
      }),
      getAddOnsCategoryById: builder.query({
        query: (id) => `restaurants/api/AddOnCategory/${id}`,
        providesTags: ["AddOnsCategory"],
      }),
      deleteAddOnCategory: builder.mutation({
        query: ({id,isActive}) => ({
          url: `restaurants/api/AddOnCategory/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["AddOnsCategory"],
      }),
      editAddOnCategory: builder.mutation({
        query: (data) => ({
          url: `restaurants/api/AddOnCategory/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["AddOnsCategory"],
      })
    }),
  });

export const {
  useGetAddOnsCategoryQuery,
  useLazyGetAddOnsCategoryQuery,
  useAddAddOnCategoryMutation,
  useGetAddOnsCategoryByIdQuery,
  useDeleteAddOnCategoryMutation,
  useEditAddOnCategoryMutation
} = addonsCategoryApiSlice;

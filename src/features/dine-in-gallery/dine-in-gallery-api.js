import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
const dineInGalleryApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["DineInGallery"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addDineInGallery: builder.mutation({
        query: (data) => ({
          url: Api.DineInGallery,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["DineInGallery"],
      }),
      getByIdDineInGallery: builder.query({
        query: (id) => ({ url: `${Api.DineInGallery}/${id}`, method: "GET" }),
      }),
      editDineInGallery: builder.mutation({
        query: ({ id, data }) => ({
          url: `${Api.DineInGallery}/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["DineInGallery"],
      }),
      deleteDineInGallery: builder.mutation({
        query: (data) => ({
          url: `${Api.DineInGallery}/${data.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["DineInGallery"],
      }),
    }),
  });

export const {
  useAddDineInGalleryMutation,
  useLazyGetByIdDineInGalleryQuery,
  useEditDineInGalleryMutation,
  useDeleteDineInGalleryMutation,
} = dineInGalleryApiSlice;

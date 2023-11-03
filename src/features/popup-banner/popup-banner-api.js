import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
const popupBannerApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["PopupBanner"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addPopupBanner: builder.mutation({
        query: (data) => ({
          url: Api.PopupBanner,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["PopupBanner"],
      }),
      getByIdPopupBanner: builder.query({
        query: (id) => ({ url: `${Api.PopupBanner}/${id}` }),
      }),
      editPopupBanner: builder.mutation({
        query: ({ id, data }) => ({
          url: `${Api.PopupBanner}/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["PopupBanner"],
      }),
      deletePopupBanner: builder.mutation({
        query: (data) => ({
          url: `${Api.PopupBanner}/${data.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["PopupBanner"],
      }),
    }),
  });

export const {
  useAddPopupBannerMutation,
  useLazyGetByIdPopupBannerQuery,
  useEditPopupBannerMutation,
  useDeletePopupBannerMutation,
} = popupBannerApiSlice;

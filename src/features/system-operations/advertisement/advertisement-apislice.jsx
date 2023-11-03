import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const advertisementApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["advertise"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAdvertisementList: builder.query({
        query: () => ({
          url: `${Api.GetListOfAdvertisement}`,
        }),
      }),
      getIdAvertisement: builder.query({
        query: (id) => ({
          url: `${Api.GetIdOfAdvertisement}${id}`,
        }),
      }),
      createNewAdvertisement: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateAdvertimentList}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["advertise"],
      }),
      updateAdvertisementById: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateAdvertisementList}${data.id}`,
          method: "PUT",
          body: data.formData,
        }),
      }),
      removeAdvertisementId: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveListOfAdvertisement}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["advertise"],
      }),
    }),
  });

export const {
  useGetAdvertisementListQuery,
  useLazyGetAdvertisementListQuery,
  useGetIdAvertisementQuery,
  useLazyGetIdAvertisementQuery,
  useCreateNewAdvertisementMutation,
  useUpdateAdvertisementByIdMutation,
  useRemoveAdvertisementIdMutation,
} = advertisementApiSlice;

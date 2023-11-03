import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const BagTypeSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Bagtype"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getListBagType: builder.query({
        query: () => ({
          url: `${Api.GetListOfBagTypes}`,
        }),
        providesTags: ["bagtype"],
      }),
      getIDBagType: builder.query({
        query: (id) => ({
          url: `${Api.GetIdOfBagTypes}${id}`,
        }),
      }),
      createNewBagType: builder.mutation({
        query: (data) => ({
          url: `${Api.CreateBagTypes}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["bagtype"],
      }),
      updateBagType: builder.mutation({
        query: (data) => ({
          url: `${Api.updateBagTypes}${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: [`bagtype`],
      }),
      removeIdOfBagType: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveBagTypes}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["bagtype"],
      }),
    }),
  });

export const {
  useGetListBagTypeQuery,
  useLazyGetListBagTypeQuery,
  useGetIDBagTypeQuery,
  useLazyGetIDBagTypeQuery,
  useCreateNewBagTypeMutation,
  useUpdateBagTypeMutation,
  useRemoveIdOfBagTypeMutation,
} = BagTypeSlice;

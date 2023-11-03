import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const kmWiseDeliveryChargeSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["DeliveryChange"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteKmWiseDC: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.KmWiseDeliveryChargeDelete}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["DeliveryChange"],
      }),
      addKmWiseDC: builder.mutation({
        query: (data) => ({
          url: `${Api.KmWiseDeliveryChargeCreate}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["DeliveryChange"],
      }),
      getDeliveryChargeById: builder.query({
        query: (id) => `${Api.GetKmWiseDeliveryCharge}/${id}`,
        providesTags: ["DeliveryCharge"],
      }),
      editKmWiseDeliveryCharge: builder.mutation({
        query: (data) => ({
          url: `${Api.KmWiseDeliveryChargeEdit}/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["DeliveryChange"],
      }),
    }),
  });

export const {
  useDeleteKmWiseDCMutation,
  useAddKmWiseDCMutation,
  useGetDeliveryChargeByIdQuery,
  useEditKmWiseDeliveryChargeMutation,
} = kmWiseDeliveryChargeSlice;

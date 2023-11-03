import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const NightShiftDeliveryChargeSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["NightShiftDeliveryCharge"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      deleteNightShiftDeliveryCharge: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.NightShiftDeliveryChargeDelete}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["NightShiftDeliveryCharge"],
      }),
      addNightShiftDeliveryCharge: builder.mutation({
        query: (data) => ({
          url: `${Api.NightShiftDeliveryChargeCreate}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["NightShiftDeliveryCharge"],
      }),
      editNightShiftDeliveryCharge: builder.mutation({
        query: (data) => ({
          url: `${Api.NightShiftDeliveryChargeEdit}/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["NightShiftDeliveryCharge"],
      }),
      getNightShiftDeliveryChargeById: builder.query({
        query: (id) => `${Api.GetNightShiftDeliveryCharge}/${id}`,
        providesTags: ["NightShiftDeliveryCharge"],
      }),
    }),
  });

export const {
  useDeleteNightShiftDeliveryChargeMutation,
  useAddNightShiftDeliveryChargeMutation,
  useEditNightShiftDeliveryChargeMutation,
  useGetNightShiftDeliveryChargeByIdQuery
} = NightShiftDeliveryChargeSlice;

import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const RiderDeliveryChargeSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RiderDeliveryCharge"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRiderDeliveryChargeById : builder.query({
        query : (id) => `${Api.RiderdeliveryChargeList}/${id}`,
        providesTags : ["RiderDeliveryCharge"]
      }),
      addRiderdeliveryCharge : builder.mutation({
        query : (data) => ({
          url : `${Api.RiderDeliveryChargeCreate}`,
          method : 'POST',
          body : data
        }),
        invalidatesTags : ["RiderDeliveryCharge"]
      }),
      editRiderdeliveryCharge : builder.mutation({
        query : (data) => ({
          url : `${Api.RiderDeliveryChargeEdit}/${data.id}`,
          method : 'PUT',
          body : data
        }),
        invalidatesTags : ["RiderDeliveryCharge"]
      }),
      deleteRiderDeliveryCharge: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RiderDeliveryChargeDelete}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["RiderDeliveryCharge"],
      }),
      getRiderTypeOptions: builder.query({
        query: () => "/riders/api/RiderType/Option",
        transformResponse : (response) =>{
          let newResponse = {
            items : response?.data?.map((item) => {
              return {
                value : item?.id,
                label : item?.name,
              };
            }),
          }
          return newResponse;
        },
      }),
      getVehicleTypeOptions: builder.query({
        query: () => "/riders/api/VehicleType/Option",
        transformResponse : (response) => {
          let newOptionResponse = {
            items : response?.data?.map((item) => {
              return {
                value : item.id,
                label : item.name
              };
            }),
          }
          return newOptionResponse;
        },
      }),
    }),
  });

export const {
  useDeleteRiderDeliveryChargeMutation,
  useGetRiderDeliveryChargeByIdQuery,
  useAddRiderdeliveryChargeMutation,
  useEditRiderdeliveryChargeMutation,
  useGetRiderTypeOptionsQuery,
  useGetVehicleTypeOptionsQuery,
} = RiderDeliveryChargeSlice;

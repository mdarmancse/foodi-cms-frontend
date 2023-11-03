import { apiSlice } from "../../api/api-slice";

const vehicleTypeApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["vehicleType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      vehicleById: builder.query({
        query: (id) => `/riders/api/vehicleType/${id}`,
      }),
      addVehicleType: builder.mutation({
        query: (data) => ({
          url: "/riders/api/vehicleType",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["vehicleType"],
      }),
      editVehicleType: builder.mutation({
        query: (data) => ({
          url: `/riders/api/vehicleType/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["vehicleType"],
      }),
      deleteVehicleType: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/riders/api/vehicleType/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useVehicleByIdQuery,
  useLazyVehicleByIdQuery,
  useAddVehicleTypeMutation,
  useEditVehicleTypeMutation,
  useDeleteVehicleTypeMutation,
} = vehicleTypeApiSlice;

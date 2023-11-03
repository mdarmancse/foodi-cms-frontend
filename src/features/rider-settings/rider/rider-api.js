import { apiSlice } from "@/features/api";

const riderApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["rider"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCity: builder.query({
        query: () => ({
          url: "/system-operations/api/City/Option",
          method: "GET",
        }),
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };

          return newResponse;
        },
      }),
      getBatchLevel: builder.query({
        query: () => ({
          url: "/riders/api/BatchLevel/GetAllBatchLevel",
          method: "GET",
        }),
        transformResponse: (response) => {
          // console.log(response);
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };
          return newResponse;
        },
      }),
      getRiderType: builder.query({
        query: () => ({ url: "/riders/api/RiderType/Option", method: "GET" }),
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };

          return newResponse;
        },
      }),
      getBagType: builder.query({
        query: () => ({ url: "/riders/api/BagType/Option", method: "GET" }),
        transformResponse: (response) => {
          // console.log(response);
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };
          return newResponse;
        },
      }),
      getVehicleType: builder.query({
        query: () => ({ url: "/riders/api/VehicleType/Option", method: "GET" }),
        transformResponse: (response) => {
          // console.log(response);
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };
          return newResponse;
        },
      }),
      getRiderById: builder.query({
        query: (id) => ({
          url: `/riders/api/Rider/${id}`,
          method: "GET",
        }),
        providesTags: ["rider"],
      }),
      addRider: builder.mutation({
        query: (data) => ({
          url: "/riders/api/Rider",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        invalidatesTags: ["rider"],
      }),
      editRider: builder.mutation({
        query: (data) => ({
          url: `/riders/api/Rider/${data.id}`,
          method: "PUT",
          body: data.values,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        invalidatesTags: ["rider"],
      }),
      deleteRider: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `riders/api/Rider/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
      }),
      approveRider: builder.mutation({
        query: ({ id, isApprove }) => ({
          url: `/riders/api/Rider/IsApprove?id=${id}&isApprove=${isApprove}`,
          method: "PUT",
        }),
      }),
    }),
  });

export const {
  useAddRiderMutation,
  useGetCityQuery,
  useGetBatchLevelQuery,
  useEditRiderMutation,
  useGetRiderByIdQuery,
  useDeleteRiderMutation,
  useApproveRiderMutation,
  useGetBagTypeQuery,
  useGetRiderTypeQuery,
  useGetVehicleTypeQuery,
} = riderApiSlice;

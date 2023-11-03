import { apiSlice } from "../api";

const riderZoneApiSLice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RiderZone"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRiderAndZones: builder.query({
        query: ({ pageNumber, perPage }) => ({
          url: `riders/api/RiderAndZone/GetAllByPagination?PageNumber=${pageNumber}&ItemsPerPage=${perPage}`,
         
        }),
        providesTags:["RiderZone"]
      }),
      getZoneOptions : builder.query({
        query : () => "system-operations/api/Zone/Option",
        transformResponse : (response) => {
          let zoneOptionsResponse = {
            items : response?.data?.map((item) => {
              return {
                value : item?.id,
                label : item?.name
              }
            })
          }
          return zoneOptionsResponse;
        },
      }),
      getRiderOptions : builder.query({
        query : () => "riders/api/RiderType/Option",
        transformResponse : (response) => {
          let riderOptionsResponse = {
            items : response?.data?.map((item) => {
              return {
                value : item?.id,
                label : item?.name
              }
            })
          }
          return riderOptionsResponse;
        }
      }),
      addRiderZone: builder.mutation({
        query: (data) => ({
          url: "riders/api/RiderAndZone",
          method: "POST",
          body: data,
        }),
        inValidatesTags: ["RiderZone"],
      }),
      deleteRiderZone : builder.mutation({
        query : (id) => ({
          url : `riders/api/RiderAndZone/${id}`,
          method: "DELETE",
        }),
        inValidatesTags: ["RiderZone"]
      }),
      editRiderZone : builder.mutation({
        query : (data) => ({
          url : `riders/api/RiderAndZone/${data?.id}`,
          method: "PUT",
          body: data,
        }),
        inValidatesTags: ["RiderZone"]
      })
    }),
  });

export const {
  useGetRiderAndZonesQuery,
  useGetZoneOptionsQuery,
  useGetRiderOptionsQuery,
  useAddRiderZoneMutation,
  useDeleteRiderZoneMutation,
  useEditRiderZoneMutation
} = riderZoneApiSLice;

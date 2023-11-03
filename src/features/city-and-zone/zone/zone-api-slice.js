import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const ZoneSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteZone: builder.mutation({
      query: (params) => ({
        url: `${Api.ZoneDelete}${params?.id}?isActive=${params?.isActive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CommonTable"],
    }),
    getCitiesForZones: builder.query({
      query: () => Api.ZoneCityOptionList,
      transformResponse: (response) => {
        if (!response.status) return response;

        return {
          ...response,
          data: response?.data.map((d) => ({
            label: d.name,
            value: d.id,
          })),
        };
      },
    }),
    createZone: builder.mutation({
      query: (body) => ({
        url: Api.ZoneCreate,
        method: "POST",
        body,
      }),
    }),
    getSingleZone: builder.query({
      query: (id) => Api.GetSingleZone + id,
    }),
    updateSingleZone: builder.mutation({
      query: (payload) => ({
        url: Api.UpdateSingleZone + payload.id,
        method: "PUT",
        body: payload.body,
      }),
    }),
  }),
});

export const {
  useDeleteZoneMutation,
  useGetCitiesForZonesQuery,
  useCreateZoneMutation,
  useGetSingleZoneQuery,
  useUpdateSingleZoneMutation,
} = ZoneSlice;

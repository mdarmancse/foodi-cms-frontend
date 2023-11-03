import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const cityApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["City"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createCity: builder.mutation({
        query: (payload) => {
          return {
            url: Api.City,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["City"],
      }),
      getSingleCity: builder.query({
        query: (id) => ({
          url: `${Api.City}/${id}`,
          method: "GET",
        }),
      }),
      updateCity: builder.mutation({
        query: (payload) => {
          return {
            url: `${Api.City}/${payload.id}`,
            method: "PUT",
            body: payload,
          };
        },
        invalidatesTags: ["City"],
      }),
      deleteCity: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.City}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["City"],
      }),
    }),
  });

export const {
  useCreateCityMutation,
  useLazyGetSingleCityQuery,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = cityApiSlice;

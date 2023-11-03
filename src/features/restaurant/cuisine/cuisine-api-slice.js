import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
import { convertToFormData } from "@/helper";

const endpointPrefix = "restaurants/api/Cuisine";

const cuisineSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCuisine: builder.query({
      query: (data) => ({
        url: Api.Cuisine,
        method: "GET",
      }),
      transformResponse: (response) => {
        // modified response
        const newResponse = {
          ...response,
          data:
            response?.data?.map((dta) => ({
              label: dta.name,
              value: dta.id,
            })) || [],
        };
        return newResponse;
      },
    }),

    createCuisine: builder.mutation({
      query: (payload) => {
        payload = convertToFormData(payload);
        return {
          url: Api.Cuisine,
          method: "POST",
          body: payload,
          FormData: true,
        };
      },
    }),
    getSingleCuisine: builder.query({
      query: (id) => ({
        url: `${Api.Cuisine}/${id}`,
      }),
    }),
    updateCuisine: builder.mutation({
      query: (payload) => {
        return {
          url: `${Api.Cuisine}/${payload.id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    deleteCuisine: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `${Api.Cuisine}/${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TableList"],
    }),
  }),
});

export const {
  useCreateCuisineMutation,
  useDeleteCuisineMutation,
  useGetSingleCuisineQuery,
  useLazyGetSingleCuisineQuery,
  useUpdateCuisineMutation,
  useGetCuisineQuery,
  useLazyGetCuisineQuery,
} = cuisineSlice;

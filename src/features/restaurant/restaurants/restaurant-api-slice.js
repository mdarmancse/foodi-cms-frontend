import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
import { convertToFormData } from "@/helper";

const restaurantSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurant: builder.query({
      query: (data) => ({
        url: Api.Restaurant,
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

    createRestaurant: builder.mutation({
      query: (payload) => {
        payload = convertToFormData(payload);
        return {
          url: Api.Restaurant,
          method: "POST",
          body: payload,
          FormData: true,
        };
      },
    }),
    getSingleRestaurant: builder.query({
      query: (id) => ({
        url: `${Api.Restaurant}/${id}`,
      }),
    }),
    updateRestaurant: builder.mutation({
      query: (payload) => {
        return {
          url: `${Api.Restaurant}/${payload.id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    deleteRestaurant: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `${Api.Restaurant}/${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TableList"],
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetSingleRestaurantQuery,
  useLazyGetSingleRestaurantQuery,
  useUpdateRestaurantMutation,
  useGetRestaurantQuery,
  useLazyGetRestaurantQuery,
} = restaurantSlice;

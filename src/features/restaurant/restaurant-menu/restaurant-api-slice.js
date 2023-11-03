import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const restaurantSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBranchName: builder.query({
      query: (data) => ({
        url: Api.GetRestaurantMenuBranch,
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
    getCategoryNamesByRestaurant: builder.query({
      query: (params) => ({
        url: Api.GetRestaurantMenuBranch,
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return {
          ...response,
          data:
            response?.data?.map((d) => ({
              label: d.name,
              value: d.id,
              branchId: d.branchId,
            })) || [],
        };
      },
    }),
    getRestaurantTimeSlotByBranchId: builder.query({
      query: (params) => ({
        url: Api.GetRestaurantMenuTimeSlot,
        method: "GET",
        params: params,
      }),
      transformResponse: (response) => response,
    }),
    getCategoryWithPreset: builder.query({
      query: (params) => ({
        url: Api.GetRestaurantMenuPreset,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          ...response,
          data:
            response?.data?.map((res) => {
              return {
                ...res,
                presetAddOns:
                  res?.presetAddOns?.map((addOn) => ({
                    ...addOn,
                    name: addOn?.addOnName,
                    price: addOn?.addOnPrice,
                  })) || [],
              };
            }) || [],
        };
      },
    }),
    createRestaurantMenu: builder.mutation({
      query: (payload) => {
        return {
          url: Api.RestaurantMenuCreate,
          method: "POST",
          body: payload,
          FormData: true,
        };
      },
    }),
    getSingleRestaurantMenu: builder.query({
      query: (id) => ({
        url: `${Api.GetSingleRestaurantMenu}${id}`,
      }),
    }),
    updateRestaurantMenu: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `${Api.RestaurantMenuUpdate}${id}`,
          method: "PUT",
          body: payload,
          formData: true,
        };
      },
    }),
    deleteRestaurantMenu: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `${Api.RestaurantMenuDelete}${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TableList"],
    }),
  }),
});

export const {
  useGetBranchNameQuery,
  useLazyGetCategoryNamesByRestaurantQuery,
  useLazyGetRestaurantTimeSlotByBranchIdQuery,
  useGetCategoryWithPresetQuery,
  useCreateRestaurantMenuMutation,
  useLazyGetSingleRestaurantMenuQuery,
  useUpdateRestaurantMenuMutation,
  useDeleteRestaurantMenuMutation,
} = restaurantSlice;

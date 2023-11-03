import { Api } from "@/constants";
import { apiSlice } from "../api";
import { arrayToParams } from "./create/helpers";

function changeResponse(response) {
  return {
    ...response,
    data: response?.data?.map((d) => {
      if (d._id) {
        return {
          label: d.name,
          value: d._id,
        };
      } else {
        return {
          label: d.name,
          value: d.id,
        };
      }
    }),
  };
}

const promoCodeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromoCodeTypes: builder.query({
      query: () => ({
        url: Api.PromoCodeTypes,
        method: "GET",
      }),
      transformResponse: (response) => {
        return {
          ...response,
          data: response.data.map((d, index) => {
            return {
              label: d.name,
              value: d.id,
              fieldValue: d.codeTypeValue,
            };
          }),
        };
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: Api.GetUserOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),
    getBranches: builder.query({
      query: () => ({
        url: Api.GetBranchOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),
    getSubscriptionTypes: builder.query({
      query: () => ({
        url: Api.GetSubscriptionTypeOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),
    getZones: builder.query({
      query: () => ({
        url: Api.GetZoneOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),
    getCuisines: builder.query({
      query: () => ({
        url: Api.GetCuisineOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),
    getMenuItems: builder.query({
      query: (params) => {
        const urlParams = arrayToParams(
          params.map((p) => p.value),
          "branchIds"
        );
        return {
          url: `${Api.GetMenuItemOptionsByBranch}?${urlParams}`,
          method: "GET",
        };
      },
      transformResponse: changeResponse,
    }),
    getCities: builder.query({
      query: () => ({
        url: Api.GetCityOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),
    getRestaurants: builder.query({
      query: () => ({
        url: Api.GetRestaurantOptions,
        method: "GET",
      }),
      transformResponse: changeResponse,
    }),

    getCategoriesByBranch: builder.query({
      query: (params) => {
        const urlParams = arrayToParams(
          params.map((p) => p.value),
          "ids"
        );
        return {
          url: `${Api.GetCategoriesByBranch}?${urlParams}`,
          method: "GET",
        };
      },
      transformResponse: changeResponse,
    }),

    createPromoCode: builder.mutation({
      query: (body) => ({
        url: Api.PromoCodeCreate,
        method: "POST",
        body,
      }),
    }),
    getSinglePromoCode: builder.query({
      query: (id) => ({
        url: Api.GetSinglePromoCode + id,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPromoCodeTypesQuery,
  useGetBranchesQuery,
  useGetCitiesQuery,
  useGetCuisinesQuery,
  useGetRestaurantsQuery,
  useGetSubscriptionTypesQuery,
  useLazyGetMenuItemsQuery,
  useGetUserQuery,
  useGetZonesQuery,
  useLazyGetCategoriesByBranchQuery,
  useCreatePromoCodeMutation,
  useLazyGetPromoCodeTypesQuery,
  useGetSinglePromoCodeQuery,
} = promoCodeSlice;

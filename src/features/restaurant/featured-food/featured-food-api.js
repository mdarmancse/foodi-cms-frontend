import { apiSlice } from "@/features/api";

const featuredFoodApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["featured-food"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBranchNames: builder.query({
        query: () => "/restaurants/api/Branch/GetBranchNames",
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
      getNamesByBranchIds: builder.query({
        query: (id) =>
          `/restaurants/api/MenuItem/GetNamesByBranchIds?branchIds=${id}`,
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
      getFeaturedFoodById: builder.query({
        query: (id) => `/restaurants/api/FeaturedFood/${id}`,
        providesTags: ["featured-food"],
      }),
      addFeaturedFood: builder.mutation({
        query: (data) => ({
          url: "/restaurants/api/FeaturedFood",
          method: "POST",
          body: data,
        }),
      }),
      editFeaturedFood: builder.mutation({
        query: (data) => ({
          url: `/restaurants/api/FeaturedFood/${data.id}`,
          method: "PUT",
          body: data,
        }),
      }),
      deleteFeaturedFood: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/restaurants/api/FeaturedFood/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
      }),
    }),
  });

export const {
  useGetBranchNamesQuery,
  useLazyGetNamesByBranchIdsQuery,
  useAddFeaturedFoodMutation,
  useGetFeaturedFoodByIdQuery,
  useEditFeaturedFoodMutation,
  useDeleteFeaturedFoodMutation,
} = featuredFoodApiSlice;

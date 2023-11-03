import { apiSlice } from "@/features/api";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatusById: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    getDetailsByBrachId: builder.query({
      query: (id) =>
        `/restaurants/api/Branch/GetBranchDetailsByBranchId?branchId=${id}`,
    }),
    getAddonsListByBranch: builder.query({
      query: (branchId) =>
        `/restaurants/api/AddOnCategory/GetAddOnCategoryListByBranchId/${branchId}`,
    }),
    getAddonsByMneu: builder.query({
      query: ({ id, branchId }) =>
        `/restaurants/api/AddOn/GetAddOnByAddOnCategoryId?id=${id}&branchId=${branchId}`,
    }),
    changeStatus: builder.mutation({
      query: ({ id, values }) => ({
        url: `/orders/admin-accept/${id}`,
        method: "PATCH",
        body: values,
      }),
    }),
    editOrder: builder.mutation({
      query: ({ id, values }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: values,
      }),
    }),
  }),
});

export const {
  useChangeStatusMutation,
  useLazyGetStatusByIdQuery,
  useEditOrderMutation,
  useGetDetailsByBrachIdQuery,
  useLazyGetAddonsByMneuQuery,
  useLazyGetAddonsListByBranchQuery,
} = orderApiSlice;

import { apiSlice } from "@/features/api";

const systemOptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSystemOptionById: builder.query({
      query: (id) => `/system-operations/api/SystemOnOffOption/${id}`,
    }),
    addSystemOption: builder.mutation({
      query: (data) => ({
        url: "/system-operations/api/SystemOnOffOption",
        method: "POST",
        body: data,
      }),
    }),
    editSystemOption: builder.mutation({
      query: (data) => ({
        url: `/system-operations/api/SystemOnOffOption/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteSystemOption: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/system-operations/api/SystemOnOffOption/${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddSystemOptionMutation,
  useEditSystemOptionMutation,
  useDeleteSystemOptionMutation,
  useLazyGetSystemOptionByIdQuery,
} = systemOptionApiSlice;

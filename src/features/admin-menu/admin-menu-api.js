import { apiSlice } from "../api";

const adminMenuSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["admin-menu"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getMenuActions: builder.query({
        query: () => "/users/api/MenuAction/GetMenuActionNames",
      }),
      getMenuNames: builder.query({
        query: () => "/users/api/Menu/all",
      }),
      addMenu: builder.mutation({
        query: (data) => ({
          url: "/users/api/Menu",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["admin-menu"],
      }),
      getMenuById: builder.query({
        query: (id) => `/users/api/Menu/${id}`,
        providesTags: ["admin-menu"],
      }),
      editMenu: builder.mutation({
        query: (data) => ({
          url: `/users/api/Menu/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["admin-menu"],
      }),
      deleteMenu: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/users/api/Menu/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["admin-menu"],
      }),
    }),
  });

export const {
  useGetMenuQuery,
  useLazyGetMenuQuery,
  useLazySearchMenuQuery,
  useGetMenuActionsQuery,
  useGetMenuNamesQuery,
  useAddMenuMutation,
  useGetMenuByIdQuery,
  useEditMenuMutation,
  useDeleteMenuMutation,
} = adminMenuSlice;

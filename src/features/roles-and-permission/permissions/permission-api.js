import { apiSlice } from "../../../features/api";

const permissionApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Permission"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAllRoles: builder.query({
        query: () => "/users/api/Role/GetAllList",
        transformResponse: (response) => {
          let newResponse = {
            items: response?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };
          return newResponse;
        },
      }),
      getMenus: builder.query({
        query: () => "/users/api/Menu/GetMenu",
      }),

      addPermission: builder.mutation({
        query: (data) => ({
          url: "/users/api/RoleMenuPermission",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Permission"],
      }),
      getById: builder.query({
        query: (id) =>
          `/users/api/RoleMenuPermission/GetRoleMenusByBatchId/${id}`,
      }),
      editPermission: builder.mutation({
        query: (data) => ({
          url: "/users/api/RoleMenuPermission",
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Permission"],
      }),
      deletePermission: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/users/api/RoleMenuPermission/DeleteByBatchId/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Permission"],
      }),
    }),
  });

export const {
  useGetAllRolesQuery,
  useGetMenusQuery,
  useAddPermissionMutation,
  useGetByIdQuery,
  useEditPermissionMutation,
  useDeletePermissionMutation,
} = permissionApiSlice;

import { apiSlice } from "@/features/api";


const rolesUserApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RolesUser"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRolesUser: builder.query({
        query: ({ limit, pageNumber }) =>
          `users/api/RoleUser/GetBatchWiseRoleUserList?PageNumber=${pageNumber}&PageSize=${limit}`,
        providesTags: ["RolesUser"],
      }),
      getAllRoles:  builder.query({
        query: () => `users/api/Role/GetAll`,
      }),
      getAllUsers: builder.query({
        query: () => `/users/api/User`,
      }),
      getRoleUserByBatchId: builder.query({
        query: ( batchId ) => `users/api/RoleUser/GetRoleUserForUpdate/${batchId}`,
        providesTags: ["RolesUser"],
      }),
      addRolesUser: builder.mutation({
        query: (data) => ({
          url: "users/api/RoleUser",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["RolesUser"],
      }),
      editRoleUser: builder.mutation({
        query: (data) => ({
          url: `users/api/RoleUser`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["RolesUser"],
      }),
      deleteRole: builder.mutation({
        query: (id) => ({
          url: `users/api/Role/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Roles"],
      }),
    }),
  });

export const {
  useGetRolesUserQuery,
  useGetAllRolesQuery,
  useGetAllUsersQuery,
  useGetRoleUserByBatchIdQuery,
  useAddRolesUserMutation,
  useEditRoleUserMutation,
  useDeleteRoleMutation,
} = rolesUserApiSlice;
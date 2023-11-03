import { Api } from "@/constants";
import { apiSlice } from "../../../features/api";

const rolesApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["Roles"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getRoleById: builder.query({
        query: (id) => ({
          url: `${Api.GetRoleById}/${id}`,
        }),
      }),
      addRole: builder.mutation({
        query: (data) => ({
          url: Api.CreateRole,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Roles"],
      }),
      editRole: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateRole}/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Roles"],
      }),
      deleteRole: builder.mutation({
        query: (data) => ({
          url: `${Api.DeleteRole}/${data?.id}?isActive=${data?.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Roles"],
      }),
    }),
  });

export const {
  useAddRoleMutation,
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
  useEditRoleMutation,
  useDeleteRoleMutation,
} = rolesApiSlice;

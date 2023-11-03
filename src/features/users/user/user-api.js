import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
const userApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      addUser: builder.mutation({
        query: (data) => ({
          url: Api.User,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["User"],
      }),
      getByIdUser: builder.query({
        query: (id) => ({ url: `${Api.User}/${id}` }),
        method: "GET",
      }),
      editUser: builder.mutation({
        query: ({ id, data }) => ({
          url: `${Api.User}/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["User"],
      }),
      deleteUser: builder.mutation({
        query: (data) => ({
          url: `${Api.User}/${data.id}?isActive=${data.isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      }),
    }),
  });

export const {
  useAddUserMutation,
  useLazyGetByIdUserQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

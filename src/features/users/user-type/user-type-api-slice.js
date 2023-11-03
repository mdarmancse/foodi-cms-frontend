import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const userTypeApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["UserType"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      createUserType: builder.mutation({
        query: (payload) => {
          return {
            url: Api.UserType,
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["UserType"],
      }),
      getSingleUserType: builder.query({
        query: (id) => ({
          url: `${Api.UserType}/${id}`,
          method: "GET",
        }),
      }),
      updateUserType: builder.mutation({
        query: (payload) => {
          return {
            url: `${Api.UserType}/${payload.id}`,
            method: "PUT",
            body: payload,
          };
        },
        invalidatesTags: ["UserType"],
      }),
      deleteUserType: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.UserType}/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["UserType"],
      }),
    }),
  });

export const {
  useCreateUserTypeMutation,
  useLazyGetSingleUserTypeQuery,
  useUpdateUserTypeMutation,
  useDeleteUserTypeMutation,
} = userTypeApiSlice;

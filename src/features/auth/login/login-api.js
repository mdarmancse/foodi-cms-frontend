import { apiSlice } from '@/features/api';

const loginApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/users/api/Authentication/cmslogin',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: '/users/api/Authentication/logout',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = loginApiSlice;
export default loginApiSlice.reducer;

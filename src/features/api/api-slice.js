import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseURL = import.meta.env.VITE_APP_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BaseURL,
    prepareHeaders: (headers, { getState }) => {
      const states = getState();
      headers.set(
        "Authorization",
        `Bearer ${states.userCredential.accessToken}`
      );
    },
  }),
  endpoints: (builder) => ({}),
});

// baseQuery: axiosBaseQuery({
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState()?.userCredential?.accessToken;
//     return `Bearer ${token}`;
//   },
// }),

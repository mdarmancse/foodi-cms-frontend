// http://18.139.92.172:5001/system-operations/api/City

import { apiSlice } from "@/features/api";

// this api just for dummy purpose
const dashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboard: builder.query({
      query: () => ({
        url: "/system-operations/api",
        method: "get",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkxNDcyNzUzLCJleHAiOjE2OTE1NTkxNTN9.SZ-cad-r5Dt0tJ1b8ZHlz6uxo35msgxrNjh8J67NYLc",
        },
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useDashboardQuery } = dashboardSlice;

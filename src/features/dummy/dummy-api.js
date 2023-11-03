import { apiSlice } from "../api/api-slice";

const dummyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ perPage, pageNumber }) =>
        `/riders/api/vehicleType?PageNumber=${pageNumber}&ItemsPerPage=${perPage}`,
    }),
    // search: builder.query({
    //   query: ({ type }) => `/riders/api/vehicleType?type=${type}`,
    // }),
  }),
});

export const { useGetDataQuery, useLazyGetDataQuery, useLazySearchQuery } =
  dummyApiSlice;

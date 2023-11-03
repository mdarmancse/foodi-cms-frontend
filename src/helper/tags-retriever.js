import { apiSlice } from "@/features/api";
import { parseObjectToParams } from "./index";

export const setTags = (...tag) => {
  if (tag.length) {
    tableApiSLice(tag);
  }
};

export const tableApiSLice = (params) => {
  return apiSlice.enhanceEndpoints({ addTagTypes: params }).injectEndpoints({
    endpoints: (builder) => {
      return {
        getTableList: builder.query({
          query: (payload) => {
            const { url, params } = payload;
            return {
              url: `${url}?${parseObjectToParams(params || {})}`,
              method: "GET",
            };
          },
          providesTags: params,
        }),
      };
    },
  });
};

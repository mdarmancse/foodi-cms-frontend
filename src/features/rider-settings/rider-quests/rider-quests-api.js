import { apiSlice } from "@/features/api";

const riderQuestApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["RiderQuests"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getQuests: builder.query({
        query: ({ pageNumber, perPage }) => ({
          url: `/riders/api/Quest?PageNumber=${pageNumber}&ItemsPerPage=${perPage}`,
          providesTags: ["RiderQuests"],
        }),
      }),
      searchQuest: builder.query({
        query: ({ perPage, pageNumber, filters }) => ({
          url: `/riders/api/Quest?${filters}&PageNumber=${pageNumber}&ItemsPerPage=${perPage}`,
          providesTags: ["RiderQuests"],
        }),
      }),
      getQuestById: builder.query({
        query: (id) => `/riders/api/Quest/${id}`,
      }),
      addQuests: builder.mutation({
        query: (data) => ({
          url: "riders/api/Quest",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["RiderQuests"],
      }),
      editQuests: builder.mutation({
        query: (data) => ({
          url: `riders/api/Quest/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["RiderQuests"],
      }),
      deleteQuests: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `riders/api/Quest/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["RiderQuests"],
      }),
    }),
  });

export const {
  useGetQuestsQuery,
  useAddQuestsMutation,
  useDeleteQuestsMutation,
  useLazySearchQuestQuery,
  useEditQuestsMutation,
  useGetQuestByIdQuery,
} = riderQuestApiSlice;

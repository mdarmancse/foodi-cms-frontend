import { apiSlice } from "@/features/api";

const referrerGoalApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Referrer Goal"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getReferrerGoalById: builder.query({
        query: (id) => ({
          url: `/riders/api/ReferralGoalSetting/${id}`,
          method: "GET",
        }),
      }),
      addReferrerGoal: builder.mutation({
        query: (data) => ({
          url: "/riders/api/ReferralGoalSetting",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Referrer Goal"],
      }),
      editReferrerGoal: builder.mutation({
        query: (data) => ({
          url: `/riders/api/ReferralGoalSetting/${data.id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Referrer Goal"],
      }),
      deleteReferrerGoal: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/riders/api/ReferralGoalSetting/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Referrer Goal"],
      }),
    }),
  });

export const {
  useAddReferrerGoalMutation,
  useDeleteReferrerGoalMutation,
  useGetReferrerGoalByIdQuery,
  useEditReferrerGoalMutation,
} = referrerGoalApiSlice;

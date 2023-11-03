import { apiSlice } from "@/features/api";

const subscriptionTypeApiSLice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["SubscriptionType"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSubscriptionTypes: builder.query({
        query: () => `user-accounting/subscription-type`,
        providesTags: ["SubscriptionType"],
      }),
      addSubscriptionTypes: builder.mutation({
        query: (data) => ({
          url: `user-accounting/subscription-type`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["SubscriptionType"],
      }),
      getSubscriptionTypeById: builder.query({
        query: (id) => `user-accounting/subscription-type/${id}`,
        providesTags: ["SubscriptionType"],
      }),
      editSubscribtionType: builder.mutation({
        query: (data) => ({
          url: `user-accounting/subscription-type/${data?.id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["SubscriptionType"],
      }),
      deleteSubscriptionTye: builder.mutation({
        query: (id) => ({
          url: `user-accounting/subscription-type/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SubscriptionType"],
      }),
    }),
  });

export const {
  useGetSubscriptionTypesQuery,
  useAddSubscriptionTypesMutation,
  useGetSubscriptionTypeByIdQuery,
  useEditSubscribtionTypeMutation,
  useDeleteSubscriptionTyeMutation
} = subscriptionTypeApiSLice;

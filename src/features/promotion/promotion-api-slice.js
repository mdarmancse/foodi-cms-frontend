import { Api } from "@/constants";
import { apiSlice } from "@/features/api";
import { convertToFormData } from "@/helper";

const promotionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPromotion: builder.query({
      query: (data) => ({
        url: Api.Promotion,
        method: "GET",
      }),
      transformResponse: (response) => {
        // modified response
        const newResponse = {
          ...response,
          data:
            response?.data?.map((dta) => ({
              label: dta.name,
              value: dta.id,
            })) || [],
        };
        return newResponse;
      },
    }),

    createPromotion: builder.mutation({
      query: (payload) => {
        payload = convertToFormData(payload);
        return {
          url: Api.Promotion,
          method: "POST",
          body: payload,
          FormData: true,
        };
      },
    }),
    getSinglePromotion: builder.query({
      query: (id) => ({
        url: `${Api.Promotion}/${id}`,
      }),
    }),
    updatePromotion: builder.mutation({
      query: (payload) => {
        return {
          url: `${Api.Promotion}/${payload.id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
    deletePromotion: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `${Api.Promotion}/${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TableList"],
    }),
  }),
});

export const {
  useCreatePromotionMutation,
  useDeletePromotionMutation,
  useGetSinglePromotionQuery,
  useLazyGetSinglePromotionQuery,
  useUpdatePromotionMutation,
  useGetPromotionQuery,
  useLazyGetPromotionQuery,
} = promotionSlice;

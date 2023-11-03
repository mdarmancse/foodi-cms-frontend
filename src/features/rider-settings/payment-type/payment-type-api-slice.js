import { apiSlice } from "@/features/api";

const paymentTypeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPaymentType: builder.mutation({
      query: (data) => ({
        url: "riders/api/PaymentType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PaymentType"],
    }),
    deletePaymentType: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `riders/api/PaymentType/${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PaymentType"],
    }),
    getPaymentTypeById: builder.query({
      query: (id) =>({
        url:`riders/api/PaymentType/${id}`,
      }) 
    }),
    editPaymentType : builder.mutation({
      query : (data) => ({
        url: `riders/api/PaymentType/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags : ["PaymentType"],
    })
  }),
});

export const {
  useAddPaymentTypeMutation,
  useDeletePaymentTypeMutation,
  useGetPaymentTypeByIdQuery,
  useEditPaymentTypeMutation,
} = paymentTypeSlice;

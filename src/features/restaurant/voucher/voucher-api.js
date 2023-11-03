import { apiSlice } from "@/features/api";

const voucherApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["voucher"] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getVoucherById: builder.query({
        query: (id) => `/system-operations/api/VoucherSetting/${id}`,
        providesTags: ["voucher"],
      }),
      addVoucher: builder.mutation({
        query: (data) => ({
          url: "/system-operations/api/VoucherSetting",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["voucher"],
      }),
      editVoucher: builder.mutation({
        query: (data) => ({
          url: `/system-operations/api/VoucherSetting/${data.id}`,
          method: "PUT",
          body: data.formData,
        }),
        invalidatesTags: ["voucher"],
      }),
      deleteVoucher: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `/system-operations/api/VoucherSetting/${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["voucher"],
      }),
    }),
  });

export const {
  useAddVoucherMutation,
  useLazyGetVoucherByIdQuery,
  useEditVoucherMutation,
  useDeleteVoucherMutation,
} = voucherApiSlice;

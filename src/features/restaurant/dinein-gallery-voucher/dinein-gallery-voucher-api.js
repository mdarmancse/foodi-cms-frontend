import { apiSlice } from "@/features/api";

const DineInGalleryVoucherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDineInVoucherById: builder.query({
      query: (id) => `/system-operations/api/VoucherSetting/${id}`,
    }),
    addDineInVoucher: builder.mutation({
      query: (data) => ({
        url: "/system-operations/api/VoucherSetting",
        method: "POST",
        body: data,
      }),
    }),
    editDineInVoucher: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: `/system-operations/api/VoucherSetting/${data.id}`,
          method: "PUT",
          body: data.formdata,
        };
      },
    }),
    deleteDineInVoucher: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/system-operations/api/VoucherSetting/${id}?isActive=${isActive}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddDineInVoucherMutation,
  useLazyGetDineInVoucherByIdQuery,
  useEditDineInVoucherMutation,
  useDeleteDineInVoucherMutation,
} = DineInGalleryVoucherApiSlice;

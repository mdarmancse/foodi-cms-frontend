import { Api } from "@/constants";
import { apiSlice } from "@/features/api";

const voucherRequestApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["VoucherRequest"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      updateVoucherRequest: builder.mutation({
        query: (payload) => {
          return {
            url: `${Api.VoucherRequest}/${payload.id}`,
            method: "PATCH",
            body: payload,
          };
        },
        invalidatesTags: ["VoucherRequest"],
      }),
    }),
  });

export const { useUpdateVoucherRequestMutation } = voucherRequestApiSlice;

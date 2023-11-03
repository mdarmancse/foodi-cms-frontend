import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const RiderAutoAssignerServiceSettingsSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["rider-auto-assigner-service-settings"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getAutoAssignerServiceSettings: builder.query({
        query: () => ({
          url: Api.GetAutoAssignerServiceSettings,
          method: "GET",
        }),
      }),
      updateAssignerServiceSettings: builder.mutation({
        query: (data) => ({
          url: `${Api.UpdateAutoAssignerList}`,
          method: "PATCH",
          body: data,
        }),
      }),
    }),
  });

export const {
  useGetAutoAssignerServiceSettingsQuery,
  useLazyGetAutoAssignerServiceSettingsQuery,
  useUpdateAssignerServiceSettingsMutation,
} = RiderAutoAssignerServiceSettingsSlice;

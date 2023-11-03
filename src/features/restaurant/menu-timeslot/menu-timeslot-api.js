import { apiSlice } from "@/features/api";
import { Api } from "@/constants";

const menuTimeSlotSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ["Time-Slot"],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getBranchNames: builder.query({
        query: () => "/restaurants/api/Branch/GetBranchNames",
        transformResponse: (response) => {
          let newResponse = {
            items: response?.data?.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            }),
          };

          return newResponse;
        },
      }),

      getTimeSlotMenu: builder.query({
        query: () => ({
          url: `${Api.GetMenuTimeSlotList}`,
        }),
      }),

      addTimeslot: builder.mutation({
        query: (data) => ({
          url: `${Api.TimeSlotMenuCreate}`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Time-Slot"],
      }),

      getTimeslotByID: builder.query({
        query: (id) => ({
          url: `${Api.GetSingleMenuTimeSlotList}${id}`,
        }),
      }),

      editMenuTimeSlot: builder.mutation({
        query: (data) => ({
          url: `${Api.TimeSlotMenuUpdate}${data.id}`,

          method: "PUT",
          body: data,
        }),
      }),

      deleteMenuTimeSlot: builder.mutation({
        query: ({ id, isActive }) => ({
          url: `${Api.RemoveTimeSlotMenu}${id}?isActive=${isActive}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Time-Slot"],
      }),
    }),
  });

export const {
  useLazyGetTimeSlotMenuQuery,
  useGetBranchNamesQuery,
  useGetTimeslotByIDQuery,
  useLazyGetTimeslotByIDQuery,
  useGetTimeSlotMenuQuery,
  useAddTimeslotMutation,
  useEditMenuTimeSlotMutation,
  useDeleteMenuTimeSlotMutation,
} = menuTimeSlotSlice;

import { apiSlice } from "./api-slice";

const CommonApiHooks = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranches: builder.query({
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
    getAllCuisines: builder.query({
      query: () => "/restaurants/api/Cuisine/GetAllNames",
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
    getAllSubscriptionTypes: builder.query({
      query: () => "/user-accounting/subscription-type",
      transformResponse: (response) => {
        let newResponse = {
          items: response?.data?.map((item) => {
            return {
              value: item._id,
              label: item.name,
            };
          }),
        };
        return newResponse;
      },
    }),
    getAllZones: builder.query({
      query: () => "/system-operations/api/Zone/Option",
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
    getAllUsers: builder.query({
      query: () => "/users/api/User/GetUserNames",
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
    getAllWeekDays: builder.query({
      query: () => "/system-operations/api/WeekDay/Option",
      transformResponse: (response) => {
        let newResponse = {
          items: response?.data?.map((item) => {
            return {
              value: item?.id,
              label: item?.name,
            };
          }),
        };
        return newResponse;
      },
    }),
    getAllVehicleType: builder.query({
      query: () => "/riders/api/VehicleType/Option",
      transformResponse: (response) => {
        let newResponse = {
          items: response?.data?.map((item) => {
            return {
              value: item?.id,
              label: item?.name,
            };
          }),
        };
        return newResponse;
      },
    }),
    getAllRiderContractType: builder.query({
      query: () => "/riders/api/RiderContractType/Option",
      transformResponse: (response) => {
        let newResponse = {
          items: response?.data?.map((item) => {
            return {
              value: item?.id,
              label: item?.name,
            };
          }),
        };
        return newResponse;
      },
    }),
    getAllRiders: builder.query({
      query: () => "/riders/api/Rider/Option",
      transformResponse: (response) => {
        let newResponse = {
          items: response?.data?.map((item) => {
            return {
              value: item?.id,
              label: item?.name,
            };
          }),
        };
        return newResponse;
      },
    }),
  }),
});

export const {
  useGetAllBranchesQuery,
  useGetAllCuisinesQuery,
  useGetAllSubscriptionTypesQuery,
  useGetAllZonesQuery,
  useGetAllUsersQuery,
  useGetAllWeekDaysQuery,
  useGetAllVehicleTypeQuery,
  useGetAllRiderContractTypeQuery,
  useGetAllRidersQuery,
} = CommonApiHooks;

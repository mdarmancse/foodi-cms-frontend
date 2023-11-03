import {
  useGetBranchesQuery,
  useGetCitiesQuery,
  useGetCuisinesQuery,
  useGetRestaurantsQuery,
  useGetSubscriptionTypesQuery,
  useGetUserQuery,
  useGetZonesQuery,
} from "../promo-code-api-slice";
import { PromoCodeTypesLabelName } from "./constants";

export const usePromoCodeOptions = () => {
  // const { data: } = useGetMenuItemsQuery();
  const { data: CityOptionsList, isLoading: cityLoading } = useGetCitiesQuery();
  const { data: CuisineOptionList, isLoading: cuisineLoading } =
    useGetCuisinesQuery();
  const { data: RestaurantOptionList, isLoading: restaurantLoading } =
    useGetRestaurantsQuery();
  const { data: SubscriptionOptionList, isLoading: subscriptionLoading } =
    useGetSubscriptionTypesQuery();
  const { data: UserOptionList, isLoading: userLoading } = useGetUserQuery();
  const { data: ZoneOptionList, isLoading: zoneLoading } = useGetZonesQuery();
  const { data: BranchOptionList, isLoading: branchLoading } =
    useGetBranchesQuery();

  const isLoading =
    cityLoading ||
    restaurantLoading ||
    cuisineLoading ||
    subscriptionLoading ||
    userLoading ||
    zoneLoading ||
    branchLoading;

  return {
    options: {
      [PromoCodeTypesLabelName.Branch]: BranchOptionList?.data || [],
      [PromoCodeTypesLabelName.City]: CityOptionsList?.data || [],
      [PromoCodeTypesLabelName.Cuisines]: CuisineOptionList?.data || [],
      [PromoCodeTypesLabelName.Restaurants]: RestaurantOptionList?.data || [],
      [PromoCodeTypesLabelName.SubscriptionType]:
        SubscriptionOptionList?.data || [],
      [PromoCodeTypesLabelName.Users]: UserOptionList?.data || [],
      [PromoCodeTypesLabelName.Zones]: ZoneOptionList?.data || [],
      [PromoCodeTypesLabelName.Categories]: [],
      [PromoCodeTypesLabelName.MenuItem]: [],
    },
    isLoading,
  };
};
